'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from '@chakra-ui/react'

import {
  collisionCeilings,
  collisionSurfaces,
  levelLength,
} from '@/components/super-mario/level-map'

export const useSettings = () => {
  const [complete, setComplete] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const length = levelLength
  const [lives, setLives] = useState(1)
  const [mario, setMario] = useState<1 | 2 | 3>(1)
  const offset = {
    mario: 40,
    x: 80,
    y: mario !== 3 ? 240 : 400,
  }
  const [mobile] = useMediaQuery(['(max-width: 48rem)'])
  const [paused, setPaused] = useState(false)
  const [score, setScore] = useState(0)
  const speed = {
    x: 16,
    y: mario !== 3 ? 16 : 24,
  }
  const [timer, setTimer] = useState(300)

  const ceilingLevels = collisionCeilings
  const surfaceLevels = collisionSurfaces
  const platformLevels = collisionSurfaces.filter((surface) => surface.kind !== 'ground')
  const groundLevels = collisionSurfaces.filter((surface) => surface.kind === 'ground')

  // Timer
  useEffect(() => {
    if (!complete && !gameOver && !paused && timer > 0) {
      const timeout = setTimeout(
        () => !complete && !gameOver && !paused && setTimer(timer - 1),
        1000
      )
      return () => {
        clearTimeout(timeout)
      }
    }
    return () => {}
  }, [complete, gameOver, paused, timer])

  return {
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
    setTimer,
  }
}
