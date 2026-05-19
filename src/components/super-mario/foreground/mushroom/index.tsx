'use client'

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'

export type MushroomProps = {
  x: number
  y: number
  active: boolean
  animationsPaused?: boolean
  setActive: (status: boolean) => void
  mario: 1 | 2 | 3
  setMario: (variant: 1 | 2 | 3) => void
  score: number
  setScore: Dispatch<SetStateAction<number>>
  worldX: number
  worldY: number
  xPos: number
  yPos: number
}

const mushroomDuration = 1.4
const mushroomEmergeSeconds = 0.62
const mushroomDelayRatio = mushroomEmergeSeconds / mushroomDuration
const mushroomDelayPercent = mushroomDelayRatio * 100
const mushroomTravelX = 320
const mushroomTravelY = 160
const mushroomMove = keyframes`
  0%, ${mushroomDelayPercent}% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(${mushroomTravelX}px, ${mushroomTravelY}px, 0); }
`

const getMushroomRect = (elapsed: number, worldX: number, worldY: number, x: number, y: number) => {
  if (elapsed <= mushroomEmergeSeconds) {
    const emergeProgress = Math.max(0, Math.min(1, elapsed / mushroomEmergeSeconds))
    const bottom = worldY + y + 80 * emergeProgress

    return {
      left: worldX + x,
      right: worldX + x + 80,
      bottom,
      top: bottom + 80,
    }
  }

  const moveProgress = Math.max(
    0,
    Math.min(1, (elapsed - mushroomEmergeSeconds) / (mushroomDuration - mushroomEmergeSeconds))
  )
  const left = worldX + x + mushroomTravelX * moveProgress
  const bottom = worldY + y + 80 - mushroomTravelY * moveProgress

  return {
    left,
    right: left + 80,
    bottom,
    top: bottom + 80,
  }
}

const Mushroom = ({
  x,
  y,
  active,
  animationsPaused = false,
  mario,
  setActive,
  setMario,
  setScore,
  worldX,
  worldY,
  xPos,
  yPos,
}: MushroomProps) => {
  const { playAudio } = useAudio()
  const spawnedAtRef = useRef(performance.now())
  const pausedAtRef = useRef<number | null>(null)
  const [appearing, setAppearing] = useState(true)
  const [running, setRunning] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const value = 1000

  const collect = useCallback(() => {
    if (active || running || disabled) return
    setActive(true)
  }, [active, disabled, running, setActive])

  useEffect(() => {
    if (appearing) {
      playAudio('mushroom')
      setAppearing(false)
    }
  }, [appearing, playAudio])

  useEffect(() => {
    if (active && !running) {
      setRunning(true)
      setScore((current) => current + value)
      playAudio('powerUp')

      if (mario < 2) {
        setMario(2)
      }

      setTimeout(() => {
        setDisabled(true)
      }, 150)
    }
  }, [active, mario, playAudio, running, setMario, setScore])

  useEffect(() => {
    if (animationsPaused && pausedAtRef.current === null) {
      pausedAtRef.current = performance.now()
      return
    }

    if (!animationsPaused && pausedAtRef.current !== null) {
      spawnedAtRef.current += performance.now() - pausedAtRef.current
      pausedAtRef.current = null
    }
  }, [animationsPaused])

  useEffect(() => {
    if (animationsPaused) return
    if (active || running || disabled) return

    let frame: number

    const tick = () => {
      const elapsed = Math.min(mushroomDuration, (performance.now() - spawnedAtRef.current) / 1000)
      const mushroomRect = getMushroomRect(elapsed, worldX, worldY, x, y)
      const marioWidth = mario === 3 ? 120 : mario === 2 ? 80 : 100
      const marioLeft = xPos + (mario === 3 ? -24 : 0)
      const marioRight = marioLeft + marioWidth
      const marioBottom = yPos
      const marioTop = yPos + (mario === 1 ? 100 : 160)
      const horizontalHit = marioRight > mushroomRect.left + 8 && marioLeft < mushroomRect.right - 8
      const verticalHit = marioTop > mushroomRect.bottom + 8 && marioBottom < mushroomRect.top - 8

      if (horizontalHit && verticalHit) {
        collect()
        return
      }

      if (elapsed < mushroomDuration) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [
    active,
    animationsPaused,
    collect,
    disabled,
    mario,
    running,
    worldX,
    worldY,
    x,
    xPos,
    y,
    yPos,
  ])

  return (
    <>
      {active && <Points x={x + 320} y={y - 40} total={value} />}
      {!disabled && (
        <Box
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
            animation: `${mushroomMove} ${mushroomDuration}s linear forwards`,
          }}
        >
          <NextImage
            alt={'mushroom'}
            src={'/images/mushroom/mushroom.png'}
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

export default Mushroom
