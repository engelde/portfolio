'use client'

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'

export type TurtleProps = {
  relative?: boolean
  x: number
  y: number
  offset: number
  falling?: boolean
  xPos?: number
  yPos?: number
  setScore?: Dispatch<SetStateAction<number>>
}

type DefeatState = 'alive' | 'shell' | 'gone'

const walkAnimation = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: -80px 0; }
  100% { background-position: 0 0; }
`

const Turtle = ({ relative, x, y, offset, falling, xPos, yPos, setScore }: TurtleProps) => {
  const { playAudio } = useAudio()
  const startedAtRef = useRef(Date.now())
  const previousYRef = useRef(yPos)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [defeatState, setDefeatState] = useState<DefeatState>('alive')
  const [defeatedX, setDefeatedX] = useState(x - offset)
  const value = 100
  const duration = (offset / 50) * 2

  const getTranslateX = useCallback(() => {
    const progress = (((Date.now() - startedAtRef.current) / 1000) % duration) / duration
    if (progress <= 0.5) return -offset + offset * (progress / 0.5)
    return -offset * ((progress - 0.5) / 0.5)
  }, [duration, offset])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (xPos === undefined || yPos === undefined) return

    const previousY = previousYRef.current ?? yPos
    previousYRef.current = yPos

    if (defeatState !== 'alive') return

    const currentX = x + getTranslateX()
    const marioCenterX = xPos + 40
    const turtleCenterX = currentX + 40
    const horizontalHit = Math.abs(marioCenterX - turtleCenterX) < 86
    const topEdge = y + 160
    const verticalHit = previousY >= topEdge - 30 && yPos <= topEdge + 40 && yPos > y + 56
    const descendingHit = falling === true && yPos <= previousY

    if (horizontalHit && verticalHit && descendingHit) {
      setDefeatedX(currentX)
      setDefeatState('shell')
      setScore?.((current) => current + value)
      playAudio('stomp')
      timeoutRef.current = setTimeout(() => setDefeatState('gone'), 1500)
    }
  }, [defeatState, falling, getTranslateX, playAudio, setScore, x, xPos, y, yPos])

  if (defeatState === 'gone') return null

  if (defeatState === 'shell') {
    return (
      <>
        <Points x={defeatedX} y={y + 160} total={value} />
        <Box
          as={motion.div}
          zIndex={2}
          position={relative ? 'relative' : 'absolute'}
          bottom={y + 'px'}
          left={defeatedX + 'px'}
          w={'80px'}
          h={'80px'}
          animate={{
            translateX: ['0px', '150px', '-150px', '90px', '0px'],
            transition: {
              type: 'keyframes',
              times: [0, 0.25, 0.55, 0.8, 1],
              duration: 1.35,
              ease: 'linear',
            },
          }}
        >
          <Box
            aria-label={'turtle shell'}
            role={'img'}
            w={'80px'}
            h={'80px'}
            bgImage={'url("/images/turtle/turtle.sprite.png")'}
            bgPosition={'-160px -80px'}
            bgRepeat={'no-repeat'}
            bgSize={'240px 160px'}
            sx={{ imageRendering: 'pixelated' }}
          />
        </Box>
      </>
    )
  }

  return (
    <Box
      as={motion.div}
      zIndex={2}
      position={relative ? 'relative' : 'absolute'}
      bottom={y + 'px'}
      left={x + 'px'}
      w={'80px'}
      h={'160px'}
      initial={{ translateX: '-' + offset + 'px', scaleX: 1 }}
      animate={{
        translateX: ['-' + offset + 'px', '0px', '0px', '-' + offset + 'px'],
        scaleX: [-1, -1, 1, 1],
        transition: {
          type: 'keyframes',
          times: [0, 0.5, 0.501, 1],
          delay: 0,
          duration: (offset / 50) * 2,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        },
      }}
    >
      <Box
        aria-label={'turtle'}
        role={'img'}
        w={'80px'}
        h={'160px'}
        bgImage={'url("/images/turtle/turtle.sprite.png")'}
        bgPosition={'0 0'}
        bgRepeat={'no-repeat'}
        bgSize={'240px 160px'}
        sx={{
          animation: `${walkAnimation} 0.9s steps(1) infinite`,
          imageRendering: 'pixelated',
        }}
      />
    </Box>
  )
}

export default Turtle
