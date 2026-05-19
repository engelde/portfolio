'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { MotionConfig } from 'framer-motion'

import { useAudio } from '@/hooks/useAudio'
import { useController } from '@/hooks/useController'
import { useGameAnimationPause } from '@/hooks/useGameAnimationPause'
import { useSettings } from '@/hooks/useSettings'
import { useWindow } from '@/hooks/useWindow'
import { isEditableTarget } from '@/lib/is-editable-target'

import Environment from './environment'
import Foreground from './foreground'
import Pipe from './foreground/pipe'
import Landscape from './landscape'
import { finalPipe, pipeSegments } from './level-map'
import Overlay from './overlay'
import End from './overlay/end'
import PipeRoom from './pipe-room'
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
const autoFinishPipeContactOffset = 80
const pipeRoomEntryPipeIds = new Set(['pipe-5', 'pipe-7'])
const pipeRoomEntryPipes = pipeSegments.filter(({ id }) => pipeRoomEntryPipeIds.has(id))
const defaultPipeRoomEntryPipe =
  pipeRoomEntryPipes.find(({ id }) => id === 'pipe-7') ?? pipeRoomEntryPipes[0]
const pipeRoomExitPipe = pipeSegments.find(({ id }) => id === 'pipe-7') ?? defaultPipeRoomEntryPipe
const pipeRoomEntryDelay = 620
const pipeRoomExitDelay = 720
const pipeRoomEntryFeetTolerance = 8
const pipeRoomEntryMouthPadding = 40
const cameraPanEngageRatio = 0.25
const maxCameraPanRatio = 1.5
const cameraPanLerp = 0.34

type AutoFinishSample = {
  time: number
  x: number
}

type PipeRoomPhase = 'idle' | 'entering' | 'room' | 'exiting'

type CameraInput = {
  disabled: boolean
  playerHeight: number
  viewportHeight: number
  y: number
  yOffset: number
}

const SuperMario = ({ ip }: SuperMarioProps) => {
  const [destroyedBricks, setDestroyedBricks] = useState<Record<string, true>>({})
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
  } = useSettings({ destroyedBricks })

  const [dying, setDying] = useState(false)
  const [autoFinishing, setAutoFinishing] = useState(false)
  const [gameOverBanner, setGameOverBanner] = useState(false)
  const [pipeRoomPhase, setPipeRoomPhase] = useState<PipeRoomPhase>('idle')
  const [pipeRoomEntryPipeId, setPipeRoomEntryPipeId] = useState(defaultPipeRoomEntryPipe?.id ?? '')
  const [collectedPipeRoomCoins, setCollectedPipeRoomCoins] = useState<Record<string, true>>({})
  const [stompBounceSignal, setStompBounceSignal] = useState(0)
  const [cameraY, setCameraY] = useState(0)
  const endLocked = complete || gameOver
  const pipeRoomActive = pipeRoomPhase !== 'idle'
  const pipeRoomEntering = pipeRoomPhase === 'entering'
  const pipeRoomExiting = pipeRoomPhase === 'exiting'
  const pipeRoomVisible = pipeRoomPhase === 'room'
  const activePipeRoomEntryPipe =
    pipeRoomEntryPipes.find(({ id }) => id === pipeRoomEntryPipeId) ?? defaultPipeRoomEntryPipe
  const scrollLocked = paused || endLocked || dying || pipeRoomActive
  const { playAudio } = useAudio()
  const { height: viewportHeight } = useWindow()
  const playAudioRef = useRef(playAudio)
  const animationRootRef = useRef<HTMLDivElement | null>(null)
  const setXRef = useRef<((val: number) => void) | null>(null)
  const autoFinishFrameRef = useRef<number | null>(null)
  const autoFinishSampleRef = useRef<AutoFinishSample | null>(null)
  const autoFinishSpeedRef = useRef(autoFinishPixelsPerSecond)
  const collectedPipeRoomCoinsRef = useRef<Record<string, true>>({})
  const cameraInputRef = useRef<CameraInput>({
    disabled: true,
    playerHeight: 100,
    viewportHeight: 0,
    y: 64,
    yOffset: 0,
  })
  const cameraYRef = useRef(0)
  const deathTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pipeRoomTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    active: !complete && !gameOver && !dying && !paused && !pipeRoomActive,
    mario: mario,
    movementLocked: autoFinishing || pipeRoomActive,
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
  const playerHeight = mario === 1 ? 100 : 160
  const worldTransform = `translate3d(${-x}px, ${cameraY}px, 0)`

  useEffect(() => {
    playAudioRef.current = playAudio
  }, [playAudio])

  useGameAnimationPause(animationRootRef, animationsPaused)

  useEffect(() => {
    cameraInputRef.current = {
      disabled: endLocked || pipeRoomActive || dying,
      playerHeight,
      viewportHeight,
      y,
      yOffset,
    }
  }, [dying, endLocked, pipeRoomActive, playerHeight, viewportHeight, y, yOffset])

  useEffect(() => {
    let frame: number

    const tick = () => {
      const cameraInput = cameraInputRef.current
      const playerTop =
        cameraInput.viewportHeight -
        (cameraInput.y + cameraInput.yOffset + cameraInput.playerHeight)
      const thresholdTop = cameraInput.viewportHeight * cameraPanEngageRatio
      const excessAboveThreshold = thresholdTop - playerTop
      const maxPan = cameraInput.viewportHeight * maxCameraPanRatio
      const target = cameraInput.disabled ? 0 : Math.max(0, Math.min(maxPan, excessAboveThreshold))
      const current = cameraYRef.current
      const next = current + (target - current) * cameraPanLerp
      const snapped = Math.abs(next - target) < 0.5 ? target : next

      cameraYRef.current = snapped
      setCameraY((previous) => (Math.abs(previous - snapped) < 0.25 ? previous : snapped))
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    setXRef.current = setX
  }, [setX])

  useEffect(() => {
    if (complete || gameOver || dying || paused || autoFinishing || pipeRoomActive) {
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
  }, [autoFinishing, complete, dying, gameOver, paused, pipeRoomActive, worldX])

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

  const handlePipeRoomExit = React.useCallback(() => {
    const exitPipe = pipeRoomExitPipe ?? activePipeRoomEntryPipe

    if (pipeRoomTimeoutRef.current) {
      clearTimeout(pipeRoomTimeoutRef.current)
      pipeRoomTimeoutRef.current = null
    }

    if (exitPipe) {
      const exitWorldX = exitPipe.x + 40

      setX(Math.max(0, exitWorldX - xOffset))
      setY(exitPipe.y + exitPipe.height - yOffset)
    }

    setPipeRoomPhase('exiting')
    pipeRoomTimeoutRef.current = setTimeout(() => {
      pipeRoomTimeoutRef.current = null
      setPipeRoomPhase('idle')

      if (exitPipe) {
        const exitWorldX = exitPipe.x + 40

        setX(Math.max(0, exitWorldX - xOffset))
        setY(exitPipe.y + exitPipe.height - yOffset)
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: exitWorldX, behavior: 'auto' })
        })
      }
    }, pipeRoomExitDelay)
  }, [activePipeRoomEntryPipe, setX, setY, xOffset, yOffset])

  const handlePipeRoomCoinCollect = React.useCallback(
    (id: string, value: number) => {
      if (collectedPipeRoomCoinsRef.current[id]) return

      collectedPipeRoomCoinsRef.current = { ...collectedPipeRoomCoinsRef.current, [id]: true }
      setCollectedPipeRoomCoins(collectedPipeRoomCoinsRef.current)
      setScore((score) => score + value)
    },
    [setScore]
  )

  const handleShellBrickHit = React.useCallback((id: string) => {
    setDestroyedBricks((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
  }, [])

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
      if (isEditableTarget(event.target)) return

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
    if (complete || gameOver || dying || autoFinishing || pipeRoomActive) return

    const autoFinishStartX = Math.max(
      length - autoFinishDistance,
      finalPipe.x - autoFinishPipeContactOffset
    )

    if (worldX >= autoFinishStartX) {
      const remaining = Math.max(0, length - window.scrollY)
      autoFinishSpeedRef.current = Math.max(
        autoFinishSpeedRef.current,
        Math.min(autoFinishMaxPixelsPerSecond, remaining / autoFinishCatchupSeconds)
      )
      setAutoFinishing(true)
    }
  }, [autoFinishing, complete, dying, gameOver, length, pipeRoomActive, worldX])

  useEffect(() => {
    if (
      pipeRoomEntryPipes.length === 0 ||
      !down ||
      pipeRoomActive ||
      complete ||
      gameOver ||
      dying ||
      paused ||
      autoFinishing ||
      jump ||
      falling
    ) {
      return
    }

    const playerCenterX = worldX + 40
    const entryPipe = pipeRoomEntryPipes.find((pipe) => {
      const pipeTop = pipe.y + pipe.height
      const standingOnEntryPipe = Math.abs(y + yOffset - pipeTop) <= pipeRoomEntryFeetTolerance
      const centeredOnPipeMouth =
        playerCenterX >= pipe.x + pipeRoomEntryMouthPadding &&
        playerCenterX <= pipe.x + 160 - pipeRoomEntryMouthPadding

      return standingOnEntryPipe && centeredOnPipeMouth
    })

    if (!entryPipe) return

    setPipeRoomEntryPipeId(entryPipe.id)
    setPipeRoomPhase('entering')
    playAudio('pipe')

    if (pipeRoomTimeoutRef.current) clearTimeout(pipeRoomTimeoutRef.current)
    pipeRoomTimeoutRef.current = setTimeout(() => {
      pipeRoomTimeoutRef.current = null
      setPipeRoomPhase('room')
    }, pipeRoomEntryDelay)
  }, [
    autoFinishing,
    complete,
    down,
    dying,
    falling,
    gameOver,
    jump,
    paused,
    pipeRoomActive,
    playAudio,
    worldX,
    y,
    yOffset,
  ])

  useEffect(() => {
    if (!autoFinishing) return

    const preventMovementKeys = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return

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

    window.addEventListener('keydown', preventMovementKeys, { passive: false })

    return () => {
      window.removeEventListener('keydown', preventMovementKeys)
    }
  }, [autoFinishing])

  useEffect(() => {
    return () => {
      if (autoFinishFrameRef.current !== null) cancelAnimationFrame(autoFinishFrameRef.current)
      if (deathTimeoutRef.current) clearTimeout(deathTimeoutRef.current)
      if (pipeRoomTimeoutRef.current) clearTimeout(pipeRoomTimeoutRef.current)
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
          transform={worldTransform}
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
            destroyedBricks={destroyedBricks}
            setLives={setLives}
            setMario={setMario}
            setScore={setScore}
            onShellBrickHit={handleShellBrickHit}
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
          transform={worldTransform}
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
          overflow={'hidden'}
          pointerEvents={endLocked ? 'auto' : 'none'}
        >
          <MemoizedEnd
            active={endLocked}
            locked={endLocked}
            mode={gameOver ? 'game-over' : 'course-clear'}
            x={length - offset.x}
            xPos={worldX}
          />
        </Box>

        {!complete && !gameOver && !pipeRoomVisible && (
          <MemoizedPlayer
            character={playerCharacter}
            cameraY={cameraY}
            complete={complete}
            down={down}
            dying={dying}
            enteringPipe={pipeRoomEntering || autoFinishing}
            enteringPipeDirection={autoFinishing ? 'right' : 'down'}
            exitingPipe={pipeRoomExiting}
            forwards={pipeRoomExiting || autoFinishing ? true : forwards}
            jump={jump}
            length={length + xOffset}
            lives={lives}
            mario={mario}
            maxXOffset={offset.x}
            mobile={mobile}
            marioZIndex={pipeRoomEntering || pipeRoomExiting || autoFinishing ? 0 : 9}
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

        {pipeRoomVisible && activePipeRoomEntryPipe && (
          <PipeRoom
            character={playerCharacter}
            collectedCoinIds={collectedPipeRoomCoins}
            onCollectCoin={handlePipeRoomCoinCollect}
            onExit={handlePipeRoomExit}
            variant={mario}
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

        {!complete && !gameOver && !dying && !autoFinishing && !pipeRoomActive && (
          <MemoizedOverlay forwards={forwards} ip={ip} xPos={worldX} yPos={y + yOffset} />
        )}
      </MotionConfig>
    </Box>
  )
}

export default SuperMario
