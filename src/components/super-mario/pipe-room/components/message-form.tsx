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
      'error-callback': () => void
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

type MessageFormStatus = 'idle' | 'sending' | 'sent' | 'setup-needed' | 'verification' | 'error'

const pipeRoomFont = 'var(--font-mono)'

const PipeRoomMessageForm = ({ form, onCancel }: PipeRoomMessageFormProps) => {
  const [status, setStatus] = useState<MessageFormStatus>('idle')
  const [turnstileToken, setTurnstileToken] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)
  const turnstileRef = useRef<HTMLDivElement | null>(null)
  const turnstileWidgetRef = useRef<TurnstileWidgetId | null>(null)
  const messageForm = config.forms.pipeRoomMessage
  const turnstileSiteKey = messageForm.turnstileSiteKey
  const turnstileEnabled = Boolean(turnstileSiteKey)
  const sending = status === 'sending'
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
    if (status === 'setup-needed') return 'Message form setup needed.'
    if (status === 'verification') return 'Verification warming up.'
    if (status === 'error') return 'Message failed. Please try again.'
    return ''
  }, [status])

  const resetTurnstile = useCallback(() => {
    const widgetId = turnstileWidgetRef.current
    if (!widgetId) return

    window.turnstile?.reset(widgetId)
    setTurnstileToken('')
  }, [])

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
            setTurnstileToken(token)
            setStatus((current) => (current === 'verification' ? 'idle' : current))
          },
          'error-callback': () => {
            setTurnstileToken('')
            setStatus('error')
          },
          'expired-callback': () => {
            setTurnstileToken('')
            setStatus('verification')
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
  }, [turnstileEnabled, turnstileSiteKey])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (turnstileEnabled && !turnstileToken) {
        setStatus('verification')
        if (turnstileWidgetRef.current) window.turnstile?.execute(turnstileWidgetRef.current)
        return
      }

      const currentForm = event.currentTarget
      const formData = new FormData(currentForm)

      if (turnstileToken) formData.set('cf-turnstile-response', turnstileToken)

      setStatus('sending')

      try {
        const response = await fetch(messageForm.endpoint, {
          body: formData,
          method: 'POST',
        })

        if (!response.ok) {
          setStatus(response.status === 500 ? 'setup-needed' : 'error')
          resetTurnstile()
          return
        }

        currentForm.reset()
        setStatus('sent')
        resetTurnstile()
      } catch {
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

      <Box as={'form'} ref={formRef} display={'grid'} gap={3} onSubmit={handleSubmit}>
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
            isDisabled={sending}
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
            {status === 'sent' ? 'Sent' : sending ? 'Sending' : 'Submit'}
          </Button>
        </HStack>

        {turnstileEnabled && (
          <Box ref={turnstileRef} position={'absolute'} w={0} h={0} overflow={'hidden'} />
        )}

        {statusMessage && (
          <Text
            color={status === 'verification' ? 'cyan.500' : 'red.500'}
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
