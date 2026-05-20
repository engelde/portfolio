'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'
import { usePowerUpCollision } from '../usePowerUpCollision'

export type OneUpProps = {
  active: boolean
  animationsPaused?: boolean
  lives: number
  x: number
  y: number
  setActive: (status: boolean) => void
  setLives: (lives: number) => void
}

const OneUp = ({
  x,
  y,
  active,
  animationsPaused = false,
  lives,
  setActive,
  setLives,
}: OneUpProps) => {
  const { playAudio } = useAudio()
  const oneUpRef = useRef<HTMLDivElement | null>(null)
  const [appearing, setAppearing] = useState(true)
  const [running, setRunning] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const value = 1

  const collect = useCallback(() => {
    if (active || running || disabled) return
    setActive(true)
  }, [active, disabled, running, setActive])

  usePowerUpCollision({
    animationsPaused,
    enabled: !active && !running && !disabled,
    onCollect: collect,
    powerUpRef: oneUpRef,
  })

  useEffect(() => {
    if (appearing) {
      playAudio('mushroom')
      setAppearing(false)
    }
  }, [appearing, playAudio])

  useEffect(() => {
    if (active && !running) {
      setRunning(true)
      playAudio('1up')
      setLives(lives + value)

      setTimeout(() => {
        setDisabled(true)
      }, 150)
    }
  }, [active, lives, playAudio, running, setLives])

  return (
    <>
      {active && <Points x={x} y={y + 40} total={'1UP'} />}
      {!disabled && (
        <Box
          ref={oneUpRef}
          zIndex={-1}
          position={'absolute'}
          left={x + 'px'}
          bottom={y + 80 + 'px'}
          w={'80px'}
          h={'80px'}
          p={0}
          cursor={'pointer'}
          opacity={active ? 0 : 1}
          transition={'opacity .1s ease-out'}
          _hover={{ cursor: 'pointer', filter: 'brightness(110%)' }}
          onClick={collect}
        >
          <NextImage
            alt={'1up'}
            src={'/images/1up/1up.png'}
            width={80}
            height={80}
            draggable={false}
            unoptimized
          />
        </Box>
      )}
    </>
  )
}

export default OneUp
