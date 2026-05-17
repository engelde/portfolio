'use client'

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import { useAudio } from '@/hooks/useAudio'

import type { EnemySegment } from '../../level-map'
import Points from '../points'

export type TurtleProps = {
  animationsPaused?: boolean
  relative?: boolean
  x: number
  y: number
  offset: number
  falling?: boolean
  xPos?: number
  yPos?: number
  setScore?: Dispatch<SetStateAction<number>>
  onStomp?: () => void
  onShellPrizeHit?: () => void
  onShellGoombaHit?: (id: string, x: number) => void
  shellTargets?: EnemySegment[]
}

type DefeatState = 'alive' | 'shell' | 'gone'

type ShellPose = {
  scaleX: number
  x: number
  y: number
}

const walkAnimation = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: -80px 0; }
  100% { background-position: 0 0; }
`

const moveAnimation = keyframes`
  0% {
    transform: translateX(calc(var(--enemy-offset) * -1)) scaleX(-1);
  }
  50% {
    transform: translateX(0) scaleX(-1);
  }
  50.1% {
    transform: translateX(0) scaleX(1);
  }
  100% {
    transform: translateX(calc(var(--enemy-offset) * -1)) scaleX(1);
  }
`

const Turtle = ({
  animationsPaused = false,
  relative,
  x,
  y,
  offset,
  falling,
  xPos,
  yPos,
  setScore,
  onStomp,
  onShellPrizeHit,
  onShellGoombaHit,
  shellTargets = [],
}: TurtleProps) => {
  const { playAudio } = useAudio()
  const startedAtRef = useRef(Date.now())
  const previousYRef = useRef(yPos)
  const playerMotionRef = useRef({ falling, previousY: yPos, xPos, yPos })
  const pausedAtRef = useRef<{ date: number; performance: number } | null>(null)
  const shellFrameRef = useRef<number | null>(null)
  const shellStartedAtRef = useRef(0)
  const shellPrizeHitRef = useRef(false)
  const shellGoombaHitRef = useRef(false)
  const [defeatState, setDefeatState] = useState<DefeatState>('alive')
  const [defeatedX, setDefeatedX] = useState(x - offset)
  const [shellPose, setShellPose] = useState<ShellPose>({
    scaleX: 1,
    x: x - offset,
    y,
  })
  const value = 100
  const duration = (offset / 50) * 2
  const shellSize = 80
  const platformEdgeX = 3275
  const prizeBoxLeftX = 3520
  const prizeHitX = prizeBoxLeftX - shellSize
  const highGroundStartX = 3360
  const highGroundY = 128
  const lowGroundY = 64
  const pipeRightX = 2160
  const finalWallX = highGroundStartX - shellSize
  const shellSpeed = 375

  const getTranslateX = useCallback(() => {
    const progress = (((Date.now() - startedAtRef.current) / 1000) % duration) / duration
    if (progress <= 0.5) return -offset + offset * (progress / 0.5)
    return -offset * ((progress - 0.5) / 0.5)
  }, [duration, offset])

  useEffect(() => {
    if (animationsPaused && pausedAtRef.current === null) {
      pausedAtRef.current = { date: Date.now(), performance: performance.now() }
      return
    }

    if (!animationsPaused && pausedAtRef.current !== null) {
      const dateDelta = Date.now() - pausedAtRef.current.date
      const performanceDelta = performance.now() - pausedAtRef.current.performance

      startedAtRef.current += dateDelta
      if (defeatState === 'shell') {
        shellStartedAtRef.current += performanceDelta
      }

      pausedAtRef.current = null
    }
  }, [animationsPaused, defeatState])

  const defeatToShell = useCallback(
    (nextX: number, stompMario = true) => {
      if (defeatState !== 'alive') return

      setDefeatedX(nextX)
      setShellPose({ scaleX: 1, x: nextX, y })
      setDefeatState('shell')
      shellStartedAtRef.current = performance.now()
      shellPrizeHitRef.current = false
      shellGoombaHitRef.current = false
      setScore?.((current) => current + value)
      if (stompMario) onStomp?.()
      playAudio('stomp')
    },
    [defeatState, onStomp, playAudio, setScore, y]
  )

  useEffect(() => {
    playerMotionRef.current = {
      falling,
      previousY: playerMotionRef.current.yPos,
      xPos,
      yPos,
    }
  }, [falling, xPos, yPos])

  const handleClick = useCallback(() => {
    if (defeatState !== 'alive') return

    defeatToShell(x + getTranslateX(), false)
  }, [defeatState, defeatToShell, getTranslateX, x])

  useEffect(() => {
    return () => {
      if (shellFrameRef.current !== null) cancelAnimationFrame(shellFrameRef.current)
    }
  }, [])

  const getGoombaX = useCallback((target: EnemySegment, now: number) => {
    const targetDuration = (target.offset / 90) * 2
    const progress = (((now - startedAtRef.current) / 1000) % targetDuration) / targetDuration
    const translateX =
      progress <= 0.5
        ? -target.offset + target.offset * (progress / 0.5)
        : -target.offset * ((progress - 0.5) / 0.5)
    return target.x + translateX
  }, [])

  const getShellPose = useCallback(
    (elapsedSeconds: number, startX: number): ShellPose | null => {
      const path = [
        ...(startX < platformEdgeX ? [{ x: platformEdgeX, y }] : []),
        ...(startX < highGroundStartX ? [{ x: highGroundStartX, y: highGroundY }] : []),
        ...(startX < prizeHitX ? [{ x: prizeHitX, y: highGroundY }] : []),
        { x: highGroundStartX, y: highGroundY },
        { x: finalWallX, y: lowGroundY },
        { x: pipeRightX, y: lowGroundY },
        { x: finalWallX, y: lowGroundY },
        { x: pipeRightX, y: lowGroundY },
      ]

      let previous = { x: startX, y }
      let remaining = elapsedSeconds

      for (let index = 0; index < path.length; index += 1) {
        const next = path[index]
        const distance = Math.hypot(next.x - previous.x, next.y - previous.y)
        const durationSeconds = Math.max(0.001, distance / shellSpeed)

        if (remaining <= durationSeconds) {
          const progress = remaining / durationSeconds
          const xPos = previous.x + (next.x - previous.x) * progress
          const yPos = previous.y + (next.y - previous.y) * progress
          const direction = next.x >= previous.x ? 1 : -1
          return {
            scaleX: direction,
            x: xPos,
            y: yPos,
          }
        }

        remaining -= durationSeconds
        previous = next
      }

      return null
    },
    [finalWallX, highGroundY, pipeRightX, platformEdgeX, prizeHitX, shellSpeed, y]
  )

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
      defeatToShell(currentX)
    }
  }, [defeatToShell, defeatState, falling, getTranslateX, x, xPos, y, yPos])

  useEffect(() => {
    if (defeatState !== 'shell' || animationsPaused) return

    const tick = (time: number) => {
      const elapsedSeconds = (time - shellStartedAtRef.current) / 1000
      const nextPose = getShellPose(elapsedSeconds, defeatedX)

      if (!nextPose) {
        shellFrameRef.current = null
        setDefeatState('gone')
        return
      }

      setShellPose(nextPose)

      const playerMotion = playerMotionRef.current
      if (playerMotion.xPos !== undefined && playerMotion.yPos !== undefined) {
        const previousY = playerMotion.previousY ?? playerMotion.yPos
        const marioLeft = playerMotion.xPos + 8
        const marioRight = playerMotion.xPos + 72
        const shellLeft = nextPose.x + 4
        const shellRight = nextPose.x + shellSize - 4
        const horizontalOverlap = Math.min(marioRight, shellRight) - Math.max(marioLeft, shellLeft)
        const shellTop = nextPose.y + shellSize
        const verticalHit =
          previousY >= shellTop - 28 &&
          playerMotion.yPos <= shellTop + 38 &&
          playerMotion.yPos > nextPose.y + 16
        const descendingHit = playerMotion.falling === true && playerMotion.yPos <= previousY

        if (horizontalOverlap >= 24 && verticalHit && descendingHit) {
          onStomp?.()
          playAudio('stomp')
          shellFrameRef.current = null
          setDefeatState('gone')
          return
        }
      }

      if (!shellPrizeHitRef.current && nextPose.x >= prizeHitX - 4) {
        shellPrizeHitRef.current = true
        onShellPrizeHit?.()
        playAudio('stomp')
      }

      if (!shellGoombaHitRef.current) {
        const shellLeft = nextPose.x
        const shellRight = nextPose.x + shellSize
        const hitTarget = shellTargets.find((target) => {
          if (Math.abs(nextPose.y - target.y) > 28) return false

          const targetX = getGoombaX(target, Date.now())
          const targetLeft = targetX + 8
          const targetRight = targetX + 72
          return shellRight >= targetLeft && shellLeft <= targetRight
        })

        if (hitTarget) {
          shellGoombaHitRef.current = true
          onShellGoombaHit?.(hitTarget.id, nextPose.x)
          shellFrameRef.current = null
          setDefeatState('gone')
          return
        }
      }

      shellFrameRef.current = requestAnimationFrame(tick)
    }

    shellFrameRef.current = requestAnimationFrame(tick)
    return () => {
      if (shellFrameRef.current !== null) {
        cancelAnimationFrame(shellFrameRef.current)
        shellFrameRef.current = null
      }
    }
  }, [
    defeatState,
    animationsPaused,
    defeatedX,
    getGoombaX,
    getShellPose,
    onShellGoombaHit,
    onShellPrizeHit,
    onStomp,
    playAudio,
    prizeHitX,
    shellTargets,
  ])

  if (defeatState === 'gone') return null

  if (defeatState === 'shell') {
    return (
      <>
        <Points x={defeatedX} y={y + 160} total={value} />
        <Box
          zIndex={2}
          position={relative ? 'relative' : 'absolute'}
          bottom={shellPose.y + 'px'}
          left={shellPose.x + 'px'}
          w={'80px'}
          h={'80px'}
          style={{
            transform: `scaleX(${shellPose.scaleX}) translateZ(0)`,
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
      zIndex={2}
      position={relative ? 'relative' : 'absolute'}
      bottom={y + 'px'}
      left={x + 'px'}
      w={'80px'}
      h={'160px'}
      cursor={'pointer'}
      onClick={handleClick}
      sx={{
        '--enemy-offset': `${offset}px`,
        animation: `${moveAnimation} ${duration}s linear infinite`,
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
