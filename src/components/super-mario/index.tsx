'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { MotionConfig } from 'framer-motion'

import { useAudio } from '@/hooks/useAudio'
import { useController } from '@/hooks/useController'
import { useGameAnimationPause } from '@/hooks/useGameAnimationPause'
import { useSettings } from '@/hooks/useSettings'

import Environment from './environment'
import Foreground from './foreground'
import Pipe from './foreground/pipe'
import Landscape from './landscape'
import { finalPipe } from './level-map'
import Overlay from './overlay'
import End from './overlay/end'
import Player from './player'

export type SuperMarioProps = {
  ip: string
}

// Memoize sub-components for maximum performance
const MemoizedEnvironment = React.memo(Environment)
const MemoizedEnd = React.memo(End)
const MemoizedForeground = React.memo(Foreground)
const MemoizedLandscape = React.memo(Landscape)
const MemoizedOverlay = React.memo(Overlay)
const MemoizedPipe = React.memo(Pipe)
const MemoizedPlayer = React.memo(Player)
const autoFinishDistance = 520
const autoFinishCatchupSeconds = 0.42
const autoFinishPixelsPerSecond = 640
const autoFinishMaxPixelsPerSecond = 2600

type AutoFinishSample = {
  time: number
  x: number
}

const SuperMario = ({ ip }: SuperMarioProps) => {
  const {
    ceilingLevels,
    complete,
    gameOver,
    groundLevels,
    length,
    lives,
    mario,
    mobile,
    offset,
    paused,
    playerCharacter,
    platformLevels,
    score,
    speed,
    surfaceLevels,
    timer,
    setComplete,
    setGameOver,
    setLives,
    setMario,
    setPaused,
    setScore,
  } = useSettings()

  const [dying, setDying] = useState(false)
  const [autoFinishing, setAutoFinishing] = useState(false)
  const [gameOverBanner, setGameOverBanner] = useState(false)
  const [stompBounceSignal, setStompBounceSignal] = useState(0)
  const endLocked = complete || gameOver
  const scrollLocked = paused || endLocked || dying
  const { playAudio } = useAudio()
  const playAudioRef = useRef(playAudio)
  const animationRootRef = useRef<HTMLDivElement | null>(null)
  const setXRef = useRef<((val: number) => void) | null>(null)
  const autoFinishFrameRef = useRef<number | null>(null)
  const autoFinishSampleRef = useRef<AutoFinishSample | null>(null)
  const autoFinishSpeedRef = useRef(autoFinishPixelsPerSecond)
  const deathTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    ceilingHit,
    down,
    falling,
    forwards,
    jump,
    maxYScroll,
    x,
    y,
    xOffset,
    yOffset,
    setX,
    setY,
  } = useController({
    active: !complete && !gameOver && !dying && !paused,
    mario: mario,
    movementLocked: autoFinishing,
    maximum: {
      length: length,
      marioOffset: offset.mario,
      xOffset: offset.x,
      yOffset: offset.y,
    },
    mobile: mobile,
    pause: {
      paused: paused,
      setPaused: setPaused,
    },
    position: {
      ceilingLevels: ceilingLevels,
      groundLevels: groundLevels,
      platformLevels: platformLevels,
      surfaceLevels: surfaceLevels,
      x: 0,
      xOffset: 0,
      y: 64,
      yOffset: 0,
    },
    speed: {
      x: speed.x,
      y: speed.y,
    },
    stompBounceSignal,
  })
  const worldX = x + xOffset
  const animationsPaused = paused

  useEffect(() => {
    playAudioRef.current = playAudio
  }, [playAudio])

  useGameAnimationPause(animationRootRef, animationsPaused)

  useEffect(() => {
    setXRef.current = setX
  }, [setX])

  useEffect(() => {
    if (complete || gameOver || dying || paused || autoFinishing) {
      autoFinishSampleRef.current = null

      if (complete || gameOver) {
        autoFinishSpeedRef.current = autoFinishPixelsPerSecond
      }

      return
    }

    const now = performance.now()
    const previous = autoFinishSampleRef.current

    if (previous) {
      const deltaX = worldX - previous.x
      const deltaSeconds = Math.max(0.001, (now - previous.time) / 1000)

      if (deltaX > 0) {
        autoFinishSpeedRef.current = Math.max(
          autoFinishPixelsPerSecond,
          Math.min(autoFinishMaxPixelsPerSecond, deltaX / deltaSeconds)
        )
      } else if (deltaX < -4) {
        autoFinishSpeedRef.current = autoFinishPixelsPerSecond
      }
    }

    autoFinishSampleRef.current = { time: now, x: worldX }
  }, [autoFinishing, complete, dying, gameOver, paused, worldX])

  const handleDeath = React.useCallback(() => {
    if (complete || gameOver || dying) return

    setDying(true)
    setGameOverBanner(true)
    setAutoFinishing(false)
    playAudio('death')
    deathTimeoutRef.current = setTimeout(() => {
      deathTimeoutRef.current = null
      setGameOverBanner(false)
      setDying(false)
      setGameOver(true)
    }, 1050)
  }, [complete, dying, gameOver, playAudio, setGameOver])

  useEffect(() => {
    if (!scrollLocked) return

    const lockedY = window.scrollY
    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow
    let restoringScroll = false
    const allowsScrollLockGesture = (event: Event) =>
      event.target instanceof Element &&
      Boolean(event.target.closest('[data-allow-scroll-lock-gesture="true"]'))
    const preventDefault = (event: Event) => {
      if (allowsScrollLockGesture(event)) return

      event.preventDefault()
    }
    const preventMovementKeys = (event: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'Space',
          'PageUp',
          'PageDown',
          'Home',
          'End',
        ].includes(event.code)
      ) {
        event.preventDefault()
      }
    }
    const restoreScroll = () => {
      if (restoringScroll || window.scrollY === lockedY) return

      restoringScroll = true
      window.scrollTo({ top: lockedY, behavior: 'auto' })
      window.requestAnimationFrame(() => {
        restoringScroll = false
      })
    }

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    window.scrollTo({ top: lockedY, behavior: 'auto' })
    window.addEventListener('wheel', preventDefault, { passive: false })
    window.addEventListener('touchmove', preventDefault, { passive: false })
    window.addEventListener('keydown', preventMovementKeys, { passive: false })
    window.addEventListener('scroll', restoreScroll, { passive: true })

    return () => {
      document.documentElement.style.overflow = htmlOverflow
      document.body.style.overflow = bodyOverflow
      window.removeEventListener('wheel', preventDefault)
      window.removeEventListener('touchmove', preventDefault)
      window.removeEventListener('keydown', preventMovementKeys)
      window.removeEventListener('scroll', restoreScroll)
    }
  }, [scrollLocked])

  useEffect(() => {
    if (!autoFinishing) return

    let lastFrame = performance.now()
    const target = length

    const tick = (time: number) => {
      const deltaSeconds = Math.min(0.04, (time - lastFrame) / 1000)
      lastFrame = time

      const current = window.scrollY
      const remaining = Math.max(0, target - current)
      const finishSpeed = Math.min(
        autoFinishMaxPixelsPerSecond,
        Math.max(
          autoFinishPixelsPerSecond,
          autoFinishSpeedRef.current,
          remaining / autoFinishCatchupSeconds
        )
      )
      const next = Math.min(target, current + finishSpeed * deltaSeconds)
      window.scrollTo({ top: next, behavior: 'auto' })

      if (target - next <= 0.5) {
        autoFinishFrameRef.current = null
        window.scrollTo({ top: target, behavior: 'auto' })
        setXRef.current?.(Math.max(0, length - offset.x))
        setAutoFinishing(false)
        setComplete(true)
        playAudioRef.current('clear')
        return
      }

      autoFinishFrameRef.current = requestAnimationFrame(tick)
    }

    autoFinishFrameRef.current = requestAnimationFrame(tick)
    return () => {
      if (autoFinishFrameRef.current !== null) {
        cancelAnimationFrame(autoFinishFrameRef.current)
        autoFinishFrameRef.current = null
      }
    }
  }, [autoFinishing, length, offset.x, setComplete])

  // Complete
  useEffect(() => {
    if (complete || gameOver || dying || autoFinishing) return

    if (worldX >= length - autoFinishDistance) {
      const remaining = Math.max(0, length - window.scrollY)
      autoFinishSpeedRef.current = Math.max(
        autoFinishSpeedRef.current,
        Math.min(autoFinishMaxPixelsPerSecond, remaining / autoFinishCatchupSeconds)
      )
      setAutoFinishing(true)
    }
  }, [autoFinishing, complete, dying, gameOver, length, worldX])

  useEffect(() => {
    if (!autoFinishing) return

    const preventDefault = (event: Event) => event.preventDefault()
    const preventMovementKeys = (event: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'Space',
          'PageUp',
          'PageDown',
          'Home',
          'End',
        ].includes(event.code)
      ) {
        event.preventDefault()
      }
    }

    window.addEventListener('wheel', preventDefault, { passive: false })
    window.addEventListener('touchmove', preventDefault, { passive: false })
    window.addEventListener('keydown', preventMovementKeys, { passive: false })

    return () => {
      window.removeEventListener('wheel', preventDefault)
      window.removeEventListener('touchmove', preventDefault)
      window.removeEventListener('keydown', preventMovementKeys)
    }
  }, [autoFinishing])

  useEffect(() => {
    return () => {
      if (autoFinishFrameRef.current !== null) cancelAnimationFrame(autoFinishFrameRef.current)
      if (deathTimeoutRef.current) clearTimeout(deathTimeoutRef.current)
    }
  }, [])

  // Hurry
  useEffect(() => {
    if (!complete && !gameOver && timer === 60) {
      playAudio('hurry')
    }
  }, [complete, gameOver, timer, playAudio])

  // Timer death
  useEffect(() => {
    if (complete || gameOver || dying || timer > 0) return

    handleDeath()
  }, [complete, dying, gameOver, handleDeath, timer])

  return (
    <Box
      ref={animationRootRef}
      data-animations-paused={animationsPaused ? 'true' : 'false'}
      overflowY={'scroll'}
      overflowX={'hidden'}
      h={maxYScroll + 'px'}
      w={'100vw'}
      sx={{
        '&[data-animations-paused="true"] *': {
          animationPlayState: 'paused !important',
        },
      }}
    >
      <MotionConfig isStatic={animationsPaused}>
        <MemoizedEnvironment mobile={mobile} />
        <Box
          zIndex={1}
          position={'fixed'}
          left={0}
          bottom={0}
          h={'100vh'}
          w={'100vw'}
          transform={`translate3d(${-x}px, 0, 0)`}
          willChange={'transform'}
        >
          <MemoizedLandscape />
          <MemoizedForeground
            down={down}
            animationsPaused={animationsPaused}
            ceilingHit={ceilingHit}
            falling={falling}
            jump={jump}
            lives={lives}
            mario={mario}
            marioOffset={offset.mario}
            score={score}
            xPos={worldX}
            yPos={y + yOffset}
            setLives={setLives}
            setMario={setMario}
            setScore={setScore}
            onStomp={() => setStompBounceSignal((value) => value + 1)}
          />
        </Box>

        <Box
          zIndex={10}
          position={'fixed'}
          left={0}
          bottom={0}
          h={'100vh'}
          w={'100vw'}
          pointerEvents={'none'}
          transform={`translate3d(${-x}px, 0, 0)`}
          willChange={'transform'}
        >
          <Box position={'absolute'} left={finalPipe.x} bottom={'64px'} w={'410px'} h={'160px'}>
            <MemoizedPipe x={0} y={0} height={finalPipe.height} rotate={finalPipe.rotate} />
          </Box>
        </Box>

        <Box
          zIndex={30}
          position={'fixed'}
          left={0}
          bottom={0}
          h={'100vh'}
          w={'100vw'}
          overflow={gameOver ? 'hidden' : 'visible'}
          pointerEvents={endLocked ? 'auto' : 'none'}
          transform={gameOver ? 'none' : `translate3d(${-x}px, 0, 0)`}
          willChange={'transform'}
        >
          <MemoizedEnd
            active={endLocked}
            locked={gameOver}
            mode={gameOver ? 'game-over' : 'course-clear'}
            x={length - offset.x}
            xPos={worldX}
          />
        </Box>

        {!complete && !gameOver && (
          <MemoizedPlayer
            character={playerCharacter}
            complete={complete}
            down={down}
            dying={dying}
            forwards={forwards}
            jump={jump}
            length={length + xOffset}
            lives={lives}
            mario={mario}
            maxXOffset={offset.x}
            mobile={mobile}
            marioZIndex={9}
            paused={paused}
            score={score}
            timer={timer}
            xOffset={xOffset}
            x={xOffset}
            xPos={worldX}
            y={y + yOffset}
            yPos={y + yOffset}
            setPaused={setPaused}
            setX={setX}
            setY={setY}
          />
        )}

        {gameOverBanner && (
          <Box
            zIndex={40}
            position={'fixed'}
            top={'50%'}
            left={'50%'}
            transform={'translate(-50%, -50%)'}
            px={{ base: 8, md: 12 }}
            py={{ base: 5, md: 6 }}
            bg={'black'}
            borderRadius={0}
            color={'red.500'}
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight={'bold'}
            letterSpacing={'4px'}
            textAlign={'center'}
            textTransform={'uppercase'}
            pointerEvents={'none'}
          >
            GAME OVER
          </Box>
        )}

        {!complete && !gameOver && !dying && !autoFinishing && (
          <MemoizedOverlay forwards={forwards} ip={ip} xPos={worldX} yPos={y + yOffset} />
        )}
      </MotionConfig>
    </Box>
  )
}

export default SuperMario
