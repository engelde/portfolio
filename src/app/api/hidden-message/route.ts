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

  if (!turnstileSecret) return { success: true } satisfies TurnstileValidationResponse
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
    [googleForm.data.emailField]: email,
    [googleForm.data.messageField]: message,
    [googleForm.data.nameField]: name,
  })

  try {
    const googleResponse = await fetch(googleForm.data.action, {
      body: googleBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    })

    if (googleResponse.status >= 400) {
      return NextResponse.json({ message: 'Message delivery failed.' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ message: 'Message delivery failed.' }, { status: 502 })
  }

  return NextResponse.json({ message: 'Message sent.' })
}
