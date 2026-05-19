'use client'

import { useMemo, useRef, useState, type FormEvent, type WheelEvent } from 'react'
import { Box, Button, Heading, HStack, Input, Text, Textarea } from '@chakra-ui/react'

import { config } from '@/lib/config'

import type { PipeRoomMessageForm as PipeRoomMessageFormConfig } from '../types'

type PipeRoomMessageFormProps = {
  form: PipeRoomMessageFormConfig
  onCancel: () => void
}

const pipeRoomMessageTarget = 'pipe-room-message-target'
const pipeRoomFont = 'var(--font-mono)'

const PipeRoomMessageForm = ({ form, onCancel }: PipeRoomMessageFormProps) => {
  const [submitted, setSubmitted] = useState(false)
  const [setupNeeded, setSetupNeeded] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const messageForm = config.forms.pipeRoomMessage
  const configured = Boolean(
    messageForm.action &&
    messageForm.emailField &&
    messageForm.nameField &&
    messageForm.messageField
  )
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
      <Box
        as={'form'}
        ref={formRef}
        action={configured ? messageForm.action : undefined}
        method={'post'}
        target={pipeRoomMessageTarget}
        display={'grid'}
        gap={3}
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          if (!configured) {
            event.preventDefault()
            setSetupNeeded(true)
            return
          }

          setSubmitted(true)
          setSetupNeeded(false)
        }}
      >
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
          name={messageForm.nameField || 'name'}
          placeholder={'Name'}
          required
          {...fieldStyles}
        />

        <Input
          aria-label={'Email'}
          autoComplete={'email'}
          h={'56px'}
          name={messageForm.emailField || 'email'}
          placeholder={'Email'}
          required
          type={'email'}
          {...fieldStyles}
        />

        <Textarea
          aria-label={'Message'}
          h={'136px'}
          name={messageForm.messageField || 'message'}
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
              setSubmitted(false)
              setSetupNeeded(false)
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
            flex={1}
            h={'56px'}
            border={'4px solid'}
            borderColor={configured ? 'white' : 'whiteAlpha.600'}
            borderRadius={0}
            bg={'black'}
            color={configured ? 'white' : 'whiteAlpha.700'}
            fontFamily={pipeRoomFont}
            fontSize={'2xl'}
            fontWeight={'black'}
            letterSpacing={0}
            textTransform={'uppercase'}
            _hover={{
              bg: configured ? 'cyan.500' : 'black',
              borderColor: configured ? 'cyan.500' : 'whiteAlpha.700',
              color: configured ? 'black' : 'white',
            }}
            _active={{ bg: configured ? 'green.500' : 'black', borderColor: 'green.500' }}
          >
            {submitted ? 'Sent' : 'Submit'}
          </Button>
        </HStack>

        {setupNeeded && (
          <Text
            color={'red.500'}
            fontFamily={pipeRoomFont}
            fontSize={'xl'}
            fontWeight={'bold'}
            lineHeight={1}
          >
            Message form setup needed.
          </Text>
        )}
      </Box>

      <Box as={'iframe'} name={pipeRoomMessageTarget} title={'Message form response'} hidden />
    </Box>
  )
}

export default PipeRoomMessageForm
