'use client'

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'

export type GoombaProps = {
  x: number
  y: number
  offset: number
  falling?: boolean
  xPos?: number
  yPos?: number
  setScore?: Dispatch<SetStateAction<number>>
}

type DefeatState = 'alive' | 'squished' | 'gone'

const walkAnimation = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: -80px 0; }
  100% { background-position: 0 0; }
`

const Goomba = ({ x, y, offset, falling, xPos, yPos, setScore }: GoombaProps) => {
  const { playAudio } = useAudio()
  const startedAtRef = useRef(Date.now())
  const previousYRef = useRef(yPos)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [defeatState, setDefeatState] = useState<DefeatState>('alive')
  const [defeatedX, setDefeatedX] = useState(x - offset)
  const value = 100
  const duration = (offset / 90) * 2

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
    const goombaCenterX = currentX + 40
    const horizontalHit = Math.abs(marioCenterX - goombaCenterX) < 74
    const topEdge = y + 80
    const verticalHit = previousY >= topEdge - 24 && yPos <= topEdge + 38 && yPos > y + 24
    const descendingHit = falling === true && yPos <= previousY

    if (horizontalHit && verticalHit && descendingHit) {
      setDefeatedX(currentX)
      setDefeatState('squished')
      setScore?.((current) => current + value)
      playAudio('stomp')
      timeoutRef.current = setTimeout(() => setDefeatState('gone'), 360)
    }
  }, [defeatState, falling, getTranslateX, playAudio, setScore, x, xPos, y, yPos])

  if (defeatState === 'gone') return null

  if (defeatState === 'squished') {
    return (
      <>
        <Points x={defeatedX} y={y + 80} total={value} />
        <Box
          zIndex={2}
          position={'absolute'}
          bottom={y + 'px'}
          left={defeatedX + 'px'}
          w={'80px'}
          h={'80px'}
        >
          <Box
            aria-label={'squished goomba'}
            role={'img'}
            w={'80px'}
            h={'80px'}
            bgImage={'url("/images/goomba/goomba.sprite.png")'}
            bgPosition={'-160px 0'}
            bgRepeat={'no-repeat'}
            bgSize={'240px 80px'}
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
      position={'absolute'}
      bottom={y + 'px'}
      left={x + 'px'}
      w={'80px'}
      h={'80px'}
      initial={{ translateX: '-' + offset + 'px' }}
      animate={{
        translateX: ['-' + offset + 'px', '0px', '-' + offset + 'px'],
        transition: {
          type: 'keyframes',
          times: [0, 0.5, 1],
          delay: 0,
          duration: (offset / 90) * 2,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        },
      }}
    >
      <Box
        aria-label={'goomba'}
        role={'img'}
        w={'80px'}
        h={'80px'}
        bgImage={'url("/images/goomba/goomba.sprite.png")'}
        bgPosition={'0 0'}
        bgRepeat={'no-repeat'}
        bgSize={'240px 80px'}
        sx={{
          animation: `${walkAnimation} 0.8s steps(1) infinite`,
          imageRendering: 'pixelated',
        }}
      />
    </Box>
  )
}

export default Goomba
