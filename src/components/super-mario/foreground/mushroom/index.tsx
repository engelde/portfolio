'use client'

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

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

type MushroomPose = {
  x: number
  y: number
}

const mushroomDuration = 1.75
const mushroomEmergeSeconds = 0.48
const mushroomTravelX = 320
const mushroomTravelY = 160
const initialMushroomPose = { x: 0, y: 80 }

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)

const getMushroomPose = (elapsed: number): MushroomPose => {
  if (elapsed <= mushroomEmergeSeconds) {
    const progress = easeOutCubic(clamp(elapsed / mushroomEmergeSeconds))

    return {
      x: 0,
      y: initialMushroomPose.y * (1 - progress),
    }
  }

  const travelProgress = clamp(
    (elapsed - mushroomEmergeSeconds) / (mushroomDuration - mushroomEmergeSeconds)
  )
  const fallProgress = clamp((travelProgress - 0.15) / 0.85)

  return {
    x: mushroomTravelX * easeOutCubic(travelProgress),
    y: mushroomTravelY * fallProgress * fallProgress,
  }
}

const getMushroomRect = (elapsed: number, worldX: number, worldY: number, x: number, y: number) => {
  const pose = getMushroomPose(Math.min(mushroomDuration, elapsed))
  const left = worldX + x + pose.x
  const bottom = worldY + y + 80 - pose.y

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
  const poseRef = useRef<MushroomPose>(initialMushroomPose)
  const [appearing, setAppearing] = useState(true)
  const [running, setRunning] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [pose, setPose] = useState<MushroomPose>(initialMushroomPose)
  const [pointsPose, setPointsPose] = useState<MushroomPose>({
    x: mushroomTravelX,
    y: mushroomTravelY,
  })
  const value = 1000

  const collect = useCallback(() => {
    if (active || running || disabled) return
    setPointsPose(poseRef.current)
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
      const elapsed = Math.max(0, (performance.now() - spawnedAtRef.current) / 1000)
      const nextPose = getMushroomPose(Math.min(mushroomDuration, elapsed))

      poseRef.current = nextPose
      setPose(nextPose)

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

      frame = requestAnimationFrame(tick)
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
      {active && <Points x={x + pointsPose.x} y={y + 80 - pointsPose.y} total={value} />}
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
          transform={`translate3d(${pose.x}px, ${pose.y}px, 0)`}
          willChange={'transform'}
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
