'use client'

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'
import { usePowerUpCollision } from '../usePowerUpCollision'

export type LeafProps = {
  x: number
  y: number
  active: boolean
  animationsPaused?: boolean
  setActive: (status: boolean) => void
  mario: 1 | 2 | 3
  setMario: (variant: 1 | 2 | 3) => void
  score: number
  setScore: Dispatch<SetStateAction<number>>
}

const leafRise = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-160px); }
`

const Leaf = ({
  x,
  y,
  active,
  animationsPaused = false,
  mario,
  setActive,
  setMario,
  setScore,
}: LeafProps) => {
  const { playAudio } = useAudio()
  const leafRef = useRef<HTMLDivElement | null>(null)
  const [running, setRunning] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const value = 1000

  const collect = useCallback(() => {
    if (active || running || disabled) return
    setActive(true)
  }, [active, disabled, running, setActive])

  usePowerUpCollision({
    animationsPaused,
    enabled: !active && !running && !disabled,
    onCollect: collect,
    powerUpRef: leafRef,
  })

  useEffect(() => {
    if (active && !running) {
      setRunning(true)
      setScore((current) => current + value)
      playAudio('leaf')

      if (mario < 3) {
        setMario(3)
      }

      setTimeout(() => {
        setDisabled(true)
      }, 150)
    }
  }, [active, mario, playAudio, running, setMario, setScore])

  return (
    <>
      {active && <Points x={x} y={260} total={value} />}
      {!disabled && (
        <Box
          ref={leafRef}
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
          sx={{
            animation: `${leafRise} 0.4s ease-in-out forwards`,
          }}
        >
          <NextImage
            alt={'leaf'}
            src={'/images/leaf/leaf.png'}
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

export default Leaf
