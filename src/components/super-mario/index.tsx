'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'

import { useAudio } from '@/hooks/useAudio'
import { useController } from '@/hooks/useController'
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
const endTakeoverDistance = 240

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
  const [endTakeover, setEndTakeover] = useState(false)
  const endLocked = complete || gameOver || endTakeover

  const { down, falling, forwards, jump, maxYScroll, x, y, xOffset, yOffset, setX, setY } =
    useController({
      active: !complete && !gameOver && !dying && !endTakeover && !paused,
      mario: mario,
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
    })
  const worldX = x + xOffset

  // Audio
  const { playAudio } = useAudio()
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const deathTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!endLocked && !dying) return

    const lockedY = window.scrollY
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

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    window.scrollTo({ top: lockedY, behavior: 'auto' })
    window.addEventListener('wheel', preventDefault, { passive: false })
    window.addEventListener('touchmove', preventDefault, { passive: false })
    window.addEventListener('keydown', preventMovementKeys, { passive: false })

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.removeEventListener('wheel', preventDefault)
      window.removeEventListener('touchmove', preventDefault)
      window.removeEventListener('keydown', preventMovementKeys)
    }
  }, [dying, endLocked])

  // Complete
  useEffect(() => {
    if (complete || gameOver || dying) return

    if (worldX >= length - endTakeoverDistance) {
      setEndTakeover(true)
      if (finishTimeoutRef.current) return

      finishTimeoutRef.current = setTimeout(() => {
        finishTimeoutRef.current = null
        setComplete(true)
        playAudio('clear')
      }, 650)
      return
    }

    if (finishTimeoutRef.current) {
      clearTimeout(finishTimeoutRef.current)
      finishTimeoutRef.current = null
    }
  }, [complete, dying, gameOver, length, playAudio, setComplete, worldX])

  useEffect(() => {
    return () => {
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current)
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

    setDying(true)
    playAudio('death')
    deathTimeoutRef.current = setTimeout(() => {
      deathTimeoutRef.current = null
      setDying(false)
      setGameOver(true)
    }, 2100)
  }, [complete, dying, gameOver, playAudio, setGameOver, timer])

  return (
    <Box overflowY={'scroll'} overflowX={'hidden'} h={maxYScroll + 'px'} w={'100vw'}>
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
        overflow={'hidden'}
        pointerEvents={endLocked ? 'auto' : 'none'}
        transform={endLocked ? 'none' : `translate3d(${-x}px, 0, 0)`}
        willChange={'transform'}
      >
        <MemoizedEnd
          active={endLocked}
          locked={endLocked}
          mode={gameOver ? 'game-over' : 'course-clear'}
          x={length - offset.x}
          xPos={worldX}
        />
      </Box>

      {!complete && !gameOver && (
        <MemoizedPlayer
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

      {!complete && !gameOver && !dying && !endTakeover && (
        <MemoizedOverlay forwards={forwards} ip={ip} xPos={worldX} yPos={y + yOffset} />
      )}
    </Box>
  )
}

export default SuperMario
