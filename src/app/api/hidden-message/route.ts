import { NextResponse } from 'next/server'

const turnstileVerifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

type TurnstileValidationResponse = {
  action?: string
  'error-codes'?: string[]
  hostname?: string
  success: boolean
}

const googleForm = {
  action: process.env.MESSAGE_FORM_ACTION || process.env.NEXT_PUBLIC_MESSAGE_FORM_ACTION || '',
  emailField: process.env.MESSAGE_EMAIL_FIELD || process.env.NEXT_PUBLIC_MESSAGE_EMAIL_FIELD || '',
  messageField:
    process.env.MESSAGE_MESSAGE_FIELD || process.env.NEXT_PUBLIC_MESSAGE_MESSAGE_FIELD || '',
  nameField: process.env.MESSAGE_NAME_FIELD || process.env.NEXT_PUBLIC_MESSAGE_NAME_FIELD || '',
}

const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || ''

const isGoogleFormConfigured = () =>
  Boolean(
    googleForm.action && googleForm.emailField && googleForm.messageField && googleForm.nameField
  )

const getStringField = (formData: FormData, name: string) => String(formData.get(name) || '').trim()

const getClientIp = (request: Request) =>
  request.headers.get('CF-Connecting-IP') ||
  request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
  request.headers.get('X-Real-IP') ||
  ''

const validateTurnstile = async (token: string, request: Request) => {
  if (!turnstileSecret) return { success: true } satisfies TurnstileValidationResponse
  if (!token) return { success: false, 'error-codes': ['missing-input-response'] }

  const body = new URLSearchParams({
    secret: turnstileSecret,
    response: token,
  })
  const remoteIp = getClientIp(request)

  if (remoteIp) body.set('remoteip', remoteIp)

  const response = await fetch(turnstileVerifyUrl, {
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
  })

  if (!response.ok) return { success: false, 'error-codes': ['siteverify-unavailable'] }

  const result = (await response.json()) as TurnstileValidationResponse

  if (result.success && result.action && result.action !== 'hidden-message') {
    return { ...result, success: false, 'error-codes': ['invalid-action'] }
  }

  return result
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = getStringField(formData, 'name')
  const email = getStringField(formData, 'email')
  const message = getStringField(formData, 'message')
  const turnstileToken = getStringField(formData, 'cf-turnstile-response')

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Missing message fields.' }, { status: 400 })
  }

  if (!isGoogleFormConfigured()) {
    return NextResponse.json({ message: 'Message form setup needed.' }, { status: 500 })
  }

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
    [googleForm.emailField]: email,
    [googleForm.messageField]: message,
    [googleForm.nameField]: name,
  })
  const googleResponse = await fetch(googleForm.action, {
    body: googleBody,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
  })

  if (googleResponse.status >= 400) {
    return NextResponse.json({ message: 'Message delivery failed.' }, { status: 502 })
  }

  return NextResponse.json({ message: 'Message sent.' })
}
