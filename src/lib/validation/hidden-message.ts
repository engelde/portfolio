import { z } from 'zod'

export const hiddenMessageTurnstileField = 'cf-turnstile-response'

const formString = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : ''),
  z.string()
)

export const hiddenMessageSchema = z.object({
  name: formString.pipe(
    z.string().min(1, 'Name is required.').max(120, 'Name must be 120 characters or fewer.')
  ),
  email: formString.pipe(
    z
      .string()
      .min(1, 'Email is required.')
      .max(254, 'Email is too long.')
      .email('Enter a valid email address.')
  ),
  message: formString.pipe(
    z
      .string()
      .min(1, 'Message is required.')
      .max(2000, 'Message must be 2,000 characters or fewer.')
  ),
  turnstileToken: formString.pipe(z.string().max(4096, 'Verification token is too long.')),
})

export type HiddenMessageInput = z.infer<typeof hiddenMessageSchema>

export const parseHiddenMessageFormData = (formData: FormData) =>
  hiddenMessageSchema.safeParse({
    email: formData.get('email'),
    message: formData.get('message'),
    name: formData.get('name'),
    turnstileToken: formData.get(hiddenMessageTurnstileField),
  })
