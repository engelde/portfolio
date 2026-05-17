'use client'

import React, { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

import { useAudio } from '@/hooks/useAudio'
import { useController } from '@/hooks/useController'
import { useSettings } from '@/hooks/useSettings'

import Environment from './environment'
import Foreground from './foreground'
import Pipe from './foreground/pipe'
import Landscape from './landscape'
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
const finalPipeX = 13040

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
    timer,
    setComplete,
    setLives,
    setMario,
    setPaused,
    setScore,
  } = useSettings()

  const { down, forwards, jump, maxYScroll, x, y, xOffset, yOffset, setX, setY } = useController({
    active: !complete && !gameOver && !paused,
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

  // Audio
  const { playAudio } = useAudio()
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Complete
  useEffect(() => {
    if (complete) return

    if (x + xOffset >= length) {
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
  }, [complete, length, x, xOffset, playAudio, setComplete])

  useEffect(() => {
    return () => {
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current)
    }
  }, [])

  // Hurry
  useEffect(() => {
    if (!complete && timer === 60) {
      playAudio('hurry')
    }
  }, [complete, timer, playAudio])

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
          jump={jump}
          lives={lives}
          mario={mario}
          marioOffset={offset.mario}
          score={score}
          xPos={x + xOffset}
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
        <Box position={'absolute'} left={finalPipeX} bottom={'64px'} w={'410px'} h={'160px'}>
          <MemoizedPipe x={0} y={0} height={410} rotate={-90} />
        </Box>
      </Box>

      <Box
        zIndex={30}
        position={'fixed'}
        left={0}
        bottom={0}
        h={'100vh'}
        w={'100vw'}
        pointerEvents={complete ? 'auto' : 'none'}
        transform={`translate3d(${-x}px, 0, 0)`}
        willChange={'transform'}
      >
        <MemoizedEnd complete={complete} x={length - offset.x} xPos={x + xOffset} />
      </Box>

      {!complete && (
        <MemoizedPlayer
          complete={complete}
          down={down}
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
          xPos={x + xOffset}
          y={y + yOffset}
          yPos={y + yOffset}
          setPaused={setPaused}
          setX={setX}
          setY={setY}
        />
      )}

      {!complete && (
        <MemoizedOverlay forwards={forwards} ip={ip} xPos={x + xOffset} yPos={y + yOffset} />
      )}
    </Box>
  )
}

export default SuperMario
