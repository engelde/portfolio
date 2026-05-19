'use client'

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'

export type GoombaProps = {
  id?: string
  animationsPaused?: boolean
  x: number
  y: number
  offset: number
  falling?: boolean
  xPos?: number
  yPos?: number
  setScore?: Dispatch<SetStateAction<number>>
  onStomp?: () => void
  onDefeat?: (id: string) => void
  shellDefeat?: {
    signal: number
    x: number
  }
}

type DefeatState = 'alive' | 'squished' | 'gone'

const walkAnimation = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: -80px 0; }
  100% { background-position: 0 0; }
`

const moveAnimation = keyframes`
  0% { transform: translateX(calc(var(--enemy-offset) * -1)); }
  50% { transform: translateX(0); }
  100% { transform: translateX(calc(var(--enemy-offset) * -1)); }
`

const Goomba = ({
  id,
  animationsPaused = false,
  x,
  y,
  offset,
  falling,
  xPos,
  yPos,
  setScore,
  onStomp,
  onDefeat,
  shellDefeat,
}: GoombaProps) => {
  const { playAudio } = useAudio()
  const startedAtRef = useRef(Date.now())
  const previousYRef = useRef(yPos)
  const pausedAtRef = useRef<number | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastShellDefeatSignalRef = useRef(0)
  const [defeatState, setDefeatState] = useState<DefeatState>('alive')
  const [defeatedX, setDefeatedX] = useState(x - offset)
  const value = 100
  const duration = (offset / 90) * 2

  const defeat = useCallback(
    (nextX: number, stompMario: boolean) => {
      setDefeatedX(nextX)
      setDefeatState('squished')
      setScore?.((current) => current + value)
      if (stompMario) onStomp?.()
      if (id) onDefeat?.(id)
      playAudio('stomp')
      timeoutRef.current = setTimeout(() => setDefeatState('gone'), 360)
    },
    [id, onDefeat, onStomp, playAudio, setScore]
  )

  const getTranslateX = useCallback(() => {
    const progress = (((Date.now() - startedAtRef.current) / 1000) % duration) / duration
    if (progress <= 0.5) return -offset + offset * (progress / 0.5)
    return -offset * ((progress - 0.5) / 0.5)
  }, [duration, offset])

  useEffect(() => {
    if (animationsPaused && pausedAtRef.current === null) {
      pausedAtRef.current = Date.now()
      return
    }

    if (!animationsPaused && pausedAtRef.current !== null) {
      startedAtRef.current += Date.now() - pausedAtRef.current
      pausedAtRef.current = null
    }
  }, [animationsPaused])

  const handleClick = useCallback(() => {
    if (defeatState !== 'alive') return

    defeat(x + getTranslateX(), false)
  }, [defeat, defeatState, getTranslateX, x])

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
      defeat(currentX, true)
    }
  }, [defeat, defeatState, falling, getTranslateX, x, xPos, y, yPos])

  useEffect(() => {
    if (!shellDefeat || defeatState !== 'alive') return
    if (shellDefeat.signal === lastShellDefeatSignalRef.current) return

    lastShellDefeatSignalRef.current = shellDefeat.signal
    defeat(shellDefeat.x, false)
  }, [defeat, defeatState, shellDefeat])

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
      zIndex={2}
      position={'absolute'}
      bottom={y + 'px'}
      left={x + 'px'}
      w={'80px'}
      h={'80px'}
      cursor={'pointer'}
      onClick={handleClick}
      sx={{
        '--enemy-offset': `${offset}px`,
        animation: `${moveAnimation} ${duration}s linear infinite`,
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
