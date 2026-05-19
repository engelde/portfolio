'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type WheelEvent,
} from 'react'
import Script from 'next/script'
import { Box, Button, Heading, HStack, Input, Text, Textarea } from '@chakra-ui/react'

import { config } from '@/lib/config'
import {
  hiddenMessageTurnstileField,
  parseHiddenMessageFormData,
} from '@/lib/validation/hidden-message'

import type { PipeRoomMessageForm as PipeRoomMessageFormConfig } from '../types'

type PipeRoomMessageFormProps = {
  form: PipeRoomMessageFormConfig
  onCancel: () => void
}

type TurnstileWidgetId = string

type Turnstile = {
  execute: (widgetId: TurnstileWidgetId) => void
  remove: (widgetId: TurnstileWidgetId) => void
  render: (
    container: HTMLElement,
    options: {
      action?: string
      appearance?: 'always' | 'execute' | 'interaction-only'
      callback: (token: string) => void
      execution?: 'execute' | 'render'
      'error-callback': (errorCode?: string) => void
      'expired-callback': () => void
      sitekey: string
    }
  ) => TurnstileWidgetId | undefined
  reset: (widgetId: TurnstileWidgetId) => void
}

declare global {
  interface Window {
    turnstile?: Turnstile
  }
}

type MessageFormStatus =
  | 'idle'
  | 'sending'
  | 'sent'
  | 'setup-needed'
  | 'validation'
  | 'verification'
  | 'error'

type HiddenMessageDelivery = {
  action: string
  fields: {
    email: string
    message: string
    name: string
  }
}

type HiddenMessageResponse = {
  delivery?: HiddenMessageDelivery
  message?: string
}

const pipeRoomFont = 'var(--font-mono)'

const turnstileErrorMessages: Record<string, string> = {
  '110100': 'Message verification is using an invalid site key.',
  '110200': 'Message verification is not configured for this domain.',
}

const getTurnstileErrorMessage = (errorCode?: string) =>
  (errorCode && turnstileErrorMessages[errorCode]) || 'Verification failed. Please try again.'

const submitGoogleFormFallback = (
  delivery: HiddenMessageDelivery,
  values: { email: string; message: string; name: string }
) =>
  new Promise<void>((resolve, reject) => {
    const iframeName = `hidden-message-${Date.now()}`
    const iframe = document.createElement('iframe')
    const form = document.createElement('form')
    const cleanup = () => {
      window.setTimeout(() => {
        form.remove()
        iframe.remove()
      }, 100)
    }
    const addInput = (name: string, value: string) => {
      const input = document.createElement('input')

      input.type = 'hidden'
      input.name = name
      input.value = value
      form.appendChild(input)
    }
    const fallbackTimer = window.setTimeout(() => {
      cleanup()
      resolve()
    }, 1800)

    iframe.name = iframeName
    iframe.title = 'Message delivery'
    iframe.style.display = 'none'

    iframe.addEventListener('load', () => {
      window.clearTimeout(fallbackTimer)
      cleanup()
      resolve()
    })

    form.action = delivery.action
    form.method = 'POST'
    form.target = iframeName
    form.style.display = 'none'

    addInput('fvv', '1')
    addInput('pageHistory', '0')
    addInput(delivery.fields.email, values.email)
    addInput(delivery.fields.message, values.message)
    addInput(delivery.fields.name, values.name)

    document.body.appendChild(iframe)
    document.body.appendChild(form)

    try {
      form.submit()
    } catch {
      window.clearTimeout(fallbackTimer)
      cleanup()
      reject(new Error('Google Forms fallback submission failed.'))
    }
  })

const PipeRoomMessageForm = ({ form, onCancel }: PipeRoomMessageFormProps) => {
  const [status, setStatus] = useState<MessageFormStatus>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)
  const pendingSubmitRef = useRef(false)
  const turnstileRef = useRef<HTMLDivElement | null>(null)
  const turnstileTokenRef = useRef('')
  const turnstileWidgetRef = useRef<TurnstileWidgetId | null>(null)
  const messageForm = config.forms.pipeRoomMessage
  const turnstileSiteKey = messageForm.turnstileSiteKey
  const turnstileEnabled = Boolean(turnstileSiteKey)
  const sending = status === 'sending'
  const submitting = sending || status === 'verification'
  const fieldStyles = useMemo(
    () => ({
      _focusVisible: {
        borderColor: 'cyan.500',
        boxShadow: '0 0 0 2px var(--chakra-colors-cyan-500)',
      },
      _placeholder: { color: 'whiteAlpha.700' },
      bg: 'black',
      border: '4px solid',
      borderColor: 'white',
      borderRadius: 0,
      color: 'white',
      fontFamily: pipeRoomFont,
      fontSize: '2xl',
      fontWeight: 'bold',
      letterSpacing: 0,
      textTransform: 'none',
    }),
    []
  )
  const statusMessage = useMemo(() => {
    if (feedbackMessage) return feedbackMessage
    if (status === 'sent') return 'Message sent.'
    if (status === 'setup-needed') return 'Message form setup needed.'
    if (status === 'verification') return 'Verification warming up.'
    if (status === 'validation') return 'Please check the message fields.'
    if (status === 'error') return 'Message failed. Please try again.'
    return ''
  }, [feedbackMessage, status])

  const setTurnstileTokenValue = useCallback((token: string) => {
    turnstileTokenRef.current = token
    setTurnstileToken(token)
  }, [])

  const resetTurnstile = useCallback(() => {
    const widgetId = turnstileWidgetRef.current

    pendingSubmitRef.current = false
    setTurnstileTokenValue('')

    if (!widgetId) return

    window.turnstile?.reset(widgetId)
  }, [setTurnstileTokenValue])

  useEffect(() => {
    if (!turnstileEnabled) return

    let cancelled = false
    let frame: number | null = null

    const renderTurnstile = () => {
      if (cancelled || turnstileWidgetRef.current) return

      const turnstile = window.turnstile
      const container = turnstileRef.current

      if (!turnstile || !container) {
        frame = requestAnimationFrame(renderTurnstile)
        return
      }

      turnstileWidgetRef.current =
        turnstile.render(container, {
          action: 'hidden-message',
          appearance: 'interaction-only',
          callback: (token) => {
            setTurnstileTokenValue(token)
            setStatus((current) => (current === 'verification' ? 'idle' : current))

            if (pendingSubmitRef.current) {
              pendingSubmitRef.current = false
              requestAnimationFrame(() => formRef.current?.requestSubmit())
            }
          },
          execution: 'execute',
          'error-callback': (errorCode) => {
            pendingSubmitRef.current = false
            setTurnstileTokenValue('')
            setFeedbackMessage(getTurnstileErrorMessage(errorCode))
            setStatus('error')
          },
          'expired-callback': () => {
            pendingSubmitRef.current = false
            setTurnstileTokenValue('')
            setStatus((current) => (current === 'sending' ? current : 'idle'))
          },
          sitekey: turnstileSiteKey,
        }) ?? null
    }

    renderTurnstile()

    return () => {
      cancelled = true
      if (frame !== null) cancelAnimationFrame(frame)
      if (turnstileWidgetRef.current) {
        window.turnstile?.remove(turnstileWidgetRef.current)
        turnstileWidgetRef.current = null
      }
    }
  }, [setTurnstileTokenValue, turnstileEnabled, turnstileSiteKey])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const currentForm = event.currentTarget
      const formData = new FormData(currentForm)
      const currentTurnstileToken = turnstileTokenRef.current || turnstileToken

      if (currentTurnstileToken) formData.set(hiddenMessageTurnstileField, currentTurnstileToken)

      const parsedMessage = parseHiddenMessageFormData(formData)

      if (!parsedMessage.success) {
        const firstError = Object.values(parsedMessage.error.flatten().fieldErrors)
          .flat()
          .find(Boolean)

        setFeedbackMessage(firstError || 'Please check the message fields.')
        setStatus('validation')
        return
      }

      if (turnstileEnabled && !currentTurnstileToken) {
        setFeedbackMessage('')
        setStatus('verification')
        pendingSubmitRef.current = true
        if (turnstileWidgetRef.current) window.turnstile?.execute(turnstileWidgetRef.current)
        return
      }

      setFeedbackMessage('')
      setStatus('sending')

      try {
        const response = await fetch(messageForm.endpoint, {
          body: formData,
          method: 'POST',
        })
        const responseBody = (await response
          .json()
          .catch(() => null)) as HiddenMessageResponse | null

        if (response.status === 202 && responseBody?.delivery) {
          await submitGoogleFormFallback(responseBody.delivery, {
            email: parsedMessage.data.email,
            message: parsedMessage.data.message,
            name: parsedMessage.data.name,
          })

          currentForm.reset()
          setFeedbackMessage('Message sent.')
          setStatus('sent')
          resetTurnstile()
          return
        }

        if (!response.ok) {
          setFeedbackMessage(responseBody?.message || '')
          setStatus(response.status === 500 ? 'setup-needed' : 'error')
          resetTurnstile()
          return
        }

        currentForm.reset()
        setFeedbackMessage(responseBody?.message || '')
        setStatus('sent')
        resetTurnstile()
      } catch {
        setFeedbackMessage('')
        setStatus('error')
        resetTurnstile()
      }
    },
    [messageForm.endpoint, resetTurnstile, turnstileEnabled, turnstileToken]
  )

  return (
    <Box
      data-pipe-room-message-form={'true'}
      position={'absolute'}
      left={form.x + 'px'}
      top={form.y + 'px'}
      zIndex={4}
      w={form.width + 'px'}
      h={form.height + 'px'}
      color={'white'}
      fontFamily={pipeRoomFont}
      pointerEvents={'auto'}
      onWheel={(event: WheelEvent<HTMLDivElement>) => event.stopPropagation()}
    >
      {turnstileEnabled && (
        <Script
          src={'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'}
          strategy={'afterInteractive'}
        />
      )}

      <Box as={'form'} ref={formRef} display={'grid'} gap={3} noValidate onSubmit={handleSubmit}>
        <Heading
          as={'h2'}
          color={'green.500'}
          fontFamily={pipeRoomFont}
          fontSize={'5xl'}
          fontWeight={'black'}
          lineHeight={1}
          textTransform={'uppercase'}
        >
          Send Message
        </Heading>

        <Input
          aria-label={'Name'}
          autoComplete={'name'}
          h={'56px'}
          name={'name'}
          placeholder={'Name'}
          required
          {...fieldStyles}
        />

        <Input
          aria-label={'Email'}
          autoComplete={'email'}
          h={'56px'}
          name={'email'}
          placeholder={'Email'}
          required
          type={'email'}
          {...fieldStyles}
        />

        <Textarea
          aria-label={'Message'}
          h={'136px'}
          name={'message'}
          placeholder={'Message'}
          required
          resize={'none'}
          {...fieldStyles}
        />

        <HStack spacing={4}>
          <Button
            type={'button'}
            flex={1}
            h={'56px'}
            border={'4px solid'}
            borderColor={'white'}
            borderRadius={0}
            bg={'black'}
            color={'white'}
            fontFamily={pipeRoomFont}
            fontSize={'2xl'}
            fontWeight={'black'}
            letterSpacing={0}
            textTransform={'uppercase'}
            onClick={() => {
              formRef.current?.reset()
              setStatus('idle')
              setFeedbackMessage('')
              resetTurnstile()
              onCancel()
            }}
            _hover={{
              bg: 'red.500',
              borderColor: 'red.500',
              color: 'black',
            }}
            _active={{ bg: 'red.600', borderColor: 'red.600' }}
          >
            Cancel
          </Button>

          <Button
            type={'submit'}
            isDisabled={submitting}
            isLoading={submitting}
            loadingText={status === 'verification' ? 'Verify' : 'Sending'}
            flex={1}
            h={'56px'}
            border={'4px solid'}
            borderColor={'white'}
            borderRadius={0}
            bg={'black'}
            color={'white'}
            fontFamily={pipeRoomFont}
            fontSize={'2xl'}
            fontWeight={'black'}
            letterSpacing={0}
            textTransform={'uppercase'}
            _hover={{
              bg: 'cyan.500',
              borderColor: 'cyan.500',
              color: 'black',
            }}
            _active={{ bg: 'green.500', borderColor: 'green.500' }}
          >
            {status === 'sent' ? 'Sent' : 'Submit'}
          </Button>
        </HStack>

        {turnstileEnabled && (
          <Box ref={turnstileRef} position={'absolute'} w={0} h={0} overflow={'hidden'} />
        )}

        {statusMessage && (
          <Text
            aria-live={'polite'}
            color={
              status === 'sent' ? 'green.500' : status === 'verification' ? 'cyan.500' : 'red.500'
            }
            fontFamily={pipeRoomFont}
            fontSize={'xl'}
            fontWeight={'bold'}
            lineHeight={1}
          >
            {statusMessage}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default PipeRoomMessageForm
