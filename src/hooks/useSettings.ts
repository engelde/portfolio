'use client'

import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from '@chakra-ui/react'

import {
  brickSegments,
  collisionCeilings,
  collisionSurfaces,
  levelLength,
  type CollisionSurface,
} from '@/components/super-mario/level-map'
import { useStore } from '@/lib/store'

type UseSettingsOptions = {
  destroyedBricks?: Record<string, true>
}

const brickTileSize = 80

const splitSurfaceAroundDestroyedBricks = (
  surface: CollisionSurface,
  destroyedBricks: Record<string, true>
) => {
  if (surface.kind !== 'brick') return [surface]

  const destroyedTiles = brickSegments
    .filter(
      (brick) =>
        destroyedBricks[brick.id] &&
        brick.y + brickTileSize === surface.height &&
        brick.x < surface.xMax &&
        brick.x + brickTileSize > surface.xMin
    )
    .map((brick) => ({
      xMin: Math.max(surface.xMin, brick.x),
      xMax: Math.min(surface.xMax, brick.x + brickTileSize),
    }))
    .sort((a, b) => a.xMin - b.xMin)

  if (destroyedTiles.length === 0) return [surface]

  const remaining: CollisionSurface[] = []
  let cursor = surface.xMin

  destroyedTiles.forEach((tile, index) => {
    if (cursor < tile.xMin) {
      remaining.push({
        ...surface,
        id: `${surface.id}-trim-${index}`,
        xMin: cursor,
        xMax: tile.xMin,
      })
    }

    cursor = Math.max(cursor, tile.xMax)
  })

  if (cursor < surface.xMax) {
    remaining.push({
      ...surface,
      id: `${surface.id}-trim-end`,
      xMin: cursor,
      xMax: surface.xMax,
    })
  }

  return remaining
}

export const useSettings = ({ destroyedBricks = {} }: UseSettingsOptions = {}) => {
  const [complete, setComplete] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const length = levelLength
  const [lives, setLives] = useState(1)
  const [mario, setMario] = useState<1 | 2 | 3>(1)
  const playerCharacter = useStore((state) => state.playerCharacter)
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
  const surfaceLevels = useMemo(
    () =>
      collisionSurfaces.flatMap((surface) =>
        splitSurfaceAroundDestroyedBricks(surface, destroyedBricks)
      ),
    [destroyedBricks]
  )
  const platformLevels = useMemo(
    () => surfaceLevels.filter((surface) => surface.kind !== 'ground'),
    [surfaceLevels]
  )
  const groundLevels = useMemo(
    () => surfaceLevels.filter((surface) => surface.kind === 'ground'),
    [surfaceLevels]
  )

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
    setTimer,
  }
}
