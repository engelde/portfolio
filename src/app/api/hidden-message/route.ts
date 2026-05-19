import { NextResponse } from 'next/server'
import { z } from 'zod'

import { parseHiddenMessageFormData } from '@/lib/validation/hidden-message'

const turnstileVerifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

const googleFormConfigSchema = z.object({
  action: z
    .string()
    .trim()
    .url('MESSAGE_FORM_ACTION must be a valid URL.')
    .refine((value) => value.includes('/formResponse'), {
      message: 'MESSAGE_FORM_ACTION must be a Google Forms formResponse URL.',
    }),
  emailField: z
    .string()
    .trim()
    .regex(/^entry\.\d+$/, 'MESSAGE_EMAIL_FIELD must look like entry.<id>.'),
  messageField: z
    .string()
    .trim()
    .regex(/^entry\.\d+$/, 'MESSAGE_MESSAGE_FIELD must look like entry.<id>.'),
  nameField: z
    .string()
    .trim()
    .regex(/^entry\.\d+$/, 'MESSAGE_NAME_FIELD must look like entry.<id>.'),
})

const turnstileValidationSchema = z
  .object({
    action: z.string().optional(),
    'error-codes': z.array(z.string()).optional(),
    hostname: z.string().optional(),
    success: z.boolean(),
  })
  .passthrough()

type TurnstileValidationResponse = z.infer<typeof turnstileValidationSchema>
type GoogleFormConfig = z.infer<typeof googleFormConfigSchema>

type GoogleDeliveryResult =
  | { success: true }
  | {
      error: string
      status?: number
      statusText?: string
      success: false
    }

const getClientIp = (request: Request) =>
  request.headers.get('CF-Connecting-IP') ||
  request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
  request.headers.get('X-Real-IP') ||
  ''

const getGoogleFormConfig = () => {
  const rawConfig = {
    action: process.env.MESSAGE_FORM_ACTION,
    emailField: process.env.MESSAGE_EMAIL_FIELD,
    messageField: process.env.MESSAGE_MESSAGE_FIELD,
    nameField: process.env.MESSAGE_NAME_FIELD,
  }

  if (!Object.values(rawConfig).every(Boolean)) {
    return {
      errors: { form: ['Missing Google Forms environment variables.'] },
      success: false as const,
    }
  }

  const config = googleFormConfigSchema.safeParse(rawConfig)

  if (!config.success) {
    return {
      errors: config.error.flatten().fieldErrors,
      success: false as const,
    }
  }

  return { data: config.data, success: true as const }
}

const validateTurnstile = async (token: string, request: Request) => {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || ''
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  if (!turnstileSecret || !turnstileSiteKey) {
    return { success: true } satisfies TurnstileValidationResponse
  }

  if (!token) return { success: false, 'error-codes': ['missing-input-response'] }

  const body = new URLSearchParams({
    secret: turnstileSecret,
    response: token,
  })
  const remoteIp = getClientIp(request)

  if (remoteIp) body.set('remoteip', remoteIp)

  try {
    const response = await fetch(turnstileVerifyUrl, {
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    })

    if (!response.ok) return { success: false, 'error-codes': ['siteverify-unavailable'] }

    const result = turnstileValidationSchema.safeParse(await response.json())

    if (!result.success) return { success: false, 'error-codes': ['siteverify-invalid-response'] }

    if (result.data.success && result.data.action && result.data.action !== 'hidden-message') {
      return { ...result.data, success: false, 'error-codes': ['invalid-action'] }
    }

    return result.data
  } catch {
    return { success: false, 'error-codes': ['siteverify-unavailable'] }
  }
}

const getGoogleFormViewUrl = (action: string) => action.replace('/formResponse', '/viewform')

const deliverToGoogleForm = async (
  config: GoogleFormConfig,
  body: URLSearchParams
): Promise<GoogleDeliveryResult> => {
  try {
    const googleResponse = await fetch(config.action, {
      body,
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Origin: 'https://docs.google.com',
        Referer: getGoogleFormViewUrl(config.action),
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36',
      },
      method: 'POST',
      redirect: 'follow',
    })

    if (googleResponse.ok) return { success: true }

    return {
      error: 'google-status',
      status: googleResponse.status,
      statusText: googleResponse.statusText,
      success: false,
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.name : 'google-fetch-failed',
      success: false,
    }
  }
}

export async function POST(request: Request) {
  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ message: 'Invalid form body.' }, { status: 400 })
  }

  const parsedMessage = parseHiddenMessageFormData(formData)

  if (!parsedMessage.success) {
    return NextResponse.json(
      {
        errors: parsedMessage.error.flatten().fieldErrors,
        message: 'Invalid message fields.',
      },
      { status: 400 }
    )
  }

  const googleForm = getGoogleFormConfig()

  if (!googleForm.success) {
    return NextResponse.json(
      { errors: googleForm.errors, message: 'Message form setup needed.' },
      { status: 500 }
    )
  }

  const { email, message, name, turnstileToken } = parsedMessage.data
  const turnstile = await validateTurnstile(turnstileToken, request)

  if (!turnstile.success) {
    return NextResponse.json(
      {
        errors: turnstile['error-codes'] ?? [],
        message: 'Verification failed.',
      },
      { status: 400 }
    )
  }

  const googleBody = new URLSearchParams({
    fvv: '1',
    pageHistory: '0',
    [googleForm.data.emailField]: email,
    [googleForm.data.messageField]: message,
    [googleForm.data.nameField]: name,
  })

  const delivery = await deliverToGoogleForm(googleForm.data, googleBody)

  if (!delivery.success) {
    console.warn('Hidden message server delivery failed; browser fallback requested.', {
      error: delivery.error,
      status: delivery.status,
      statusText: delivery.statusText,
    })

    return NextResponse.json(
      {
        delivery: {
          action: googleForm.data.action,
          fields: {
            email: googleForm.data.emailField,
            message: googleForm.data.messageField,
            name: googleForm.data.nameField,
          },
        },
        message: 'Message verified. Completing delivery.',
      },
      { status: 202 }
    )
  }

  return NextResponse.json({ message: 'Message sent.' })
}
