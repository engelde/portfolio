'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import Footer from '@/components/footer'
import { useAudio } from '@/hooks/useAudio'
import { useWindow } from '@/hooks/useWindow'
import type { PlayerCharacter } from '@/lib/store'

import Pipe from '../foreground/pipe'

type PipeRoomProps = {
  character: PlayerCharacter
  onExit: () => void
  variant: 1 | 2 | 3
}

type PlayerSprite = {
  name: 'regular' | 'super' | 'raccoon'
  width: number
  height: number
  frames: number
}

type Rect = {
  id: string
  x: number
  y: number
  width: number
  height: number
}

type Position = {
  x: number
  y: number
}

const tile = 80
const roomMap = [
  '########..############..########',
  '########................########',
  '########................########',
  '########................########',
  '########.............###########',
  '########............############',
  '########...........#############',
  '########..........##############',
  '########.........###############',
  '########........################',
  '################################',
  '################################',
] as const
const roomColumns = roomMap[0].length
const roomRows = roomMap.length
const roomWidth = roomColumns * tile
const roomHeight = roomRows * tile
const gravity = 1.35
const jumpVelocity = -24
const moveSpeed = 8
const wheelSpeed = 0.42
const collisionStep = 8
const supportOverlap = 20
const stepSupportOverlap = 2
const supportTolerance = 3
const pipeExitDelay = 620
const pipeExitMouthPadding = 24
const pipeExitMouthY = tile * 2
const pipeExitMouthTolerance = 24
const defaultPipeExitTravel = tile * 2
const amazeLines = ['AMAZE', 'AMAZE', 'AMAZE']

const sprites = {
  1: { name: 'regular', width: 100, height: 100, frames: 3 },
  2: { name: 'super', width: 80, height: 160, frames: 4 },
  3: { name: 'raccoon', width: 120, height: 160, frames: 4 },
} satisfies Record<PipeRoomProps['variant'], PlayerSprite>

const topPipes = [
  { id: 'left-pipe', x: 8 * tile, y: 0 },
  { id: 'right-pipe', x: 22 * tile, y: 0 },
] satisfies Array<Pick<Rect, 'id' | 'x' | 'y'>>
const leftEntryPipe = topPipes[0]
const rightExitPipe = topPipes[1]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const getGridStart = (roomLeft: number) => roomLeft - Math.ceil(roomLeft / tile) * tile

const getGridEnd = (width: number, gridStart: number) =>
  gridStart + Math.ceil((width - gridStart) / tile) * tile

const getGridHeight = (height: number, top: number) =>
  Math.max(0, Math.ceil((height - top) / tile) * tile)

const getMovementBounds = (sprite: PlayerSprite) => {
  const inset = getInset(sprite)

  return {
    minX: tile * 8 - inset,
    maxX: tile * 24 - sprite.width + inset,
  }
}

const cellRect = (id: string, column: number, row: number): Rect => ({
  id,
  x: column * tile,
  y: row * tile,
  width: tile,
  height: tile,
})

const buildWallRuns = () => {
  const runs: Rect[] = []

  roomMap.forEach((row, rowIndex) => {
    let runStart: number | null = null

    Array.from(row + '.').forEach((cell, columnIndex) => {
      if (cell === '#') {
        runStart ??= columnIndex
        return
      }

      if (runStart === null) return

      runs.push({
        id: `wall-${rowIndex}-${runStart}`,
        x: runStart * tile,
        y: rowIndex * tile,
        width: (columnIndex - runStart) * tile,
        height: tile,
      })
      runStart = null
    })
  })

  return runs
}

const buildSolidCells = () => {
  const cells = new Map<string, Rect>()
  const addCell = (column: number, row: number, id = `solid-${row}-${column}`) => {
    cells.set(`${column}-${row}`, cellRect(id, column, row))
  }

  roomMap.forEach((row, rowIndex) => {
    Array.from(row).forEach((cell, columnIndex) => {
      if (cell === '#') addCell(columnIndex, rowIndex)
    })
  })

  return Array.from(cells.values())
}

const wallRuns = buildWallRuns()
const solidCells = buildSolidCells()
const solidCellKeys = new Set(solidCells.map(({ x, y }) => `${x / tile}-${y / tile}`))
const surfaces = solidCells
  .filter(({ x, y }) => y > 0 && !solidCellKeys.has(`${x / tile}-${y / tile - 1}`))
  .map(({ id, x, y, width }) => ({ id, x, y, width }))

const getInset = (sprite: PlayerSprite) =>
  Math.min(20, Math.max(10, Math.round(sprite.width * 0.18)))

const getPlayerRect = (position: Position, sprite: PlayerSprite) => {
  const inset = getInset(sprite)

  return {
    left: position.x + inset,
    right: position.x + sprite.width - inset,
    top: position.y + 6,
    bottom: position.y + sprite.height - 1,
  }
}

const getOverlap = (aStart: number, aEnd: number, bStart: number, bEnd: number) =>
  Math.min(aEnd, bEnd) - Math.max(aStart, bStart)

const overlaps = (position: Position, sprite: PlayerSprite, solid: Rect) => {
  const player = getPlayerRect(position, sprite)

  return (
    player.right > solid.x &&
    player.left < solid.x + solid.width &&
    player.bottom > solid.y &&
    player.top < solid.y + solid.height
  )
}

const findStandingSurface = (position: Position, sprite: PlayerSprite) => {
  const inset = getInset(sprite)
  const footLeft = position.x + inset
  const footRight = position.x + sprite.width - inset
  const footY = position.y + sprite.height
  const matches = surfaces
    .filter(
      ({ x, y, width }) =>
        Math.abs(y - footY) <= supportTolerance &&
        getOverlap(footLeft, footRight, x, x + width) >= supportOverlap
    )
    .map(({ y }) => y)

  return matches.length > 0 ? Math.min(...matches) : null
}

const findStepSurface = (
  position: Position,
  currentSurfaceY: number,
  sprite: PlayerSprite,
  direction: number
) => {
  const inset = getInset(sprite)
  const footLeft = position.x + inset
  const footRight = position.x + sprite.width - inset
  const matches = surfaces
    .filter(
      ({ x, y, width }) =>
        Math.abs(y - currentSurfaceY) <= tile + supportTolerance &&
        getOverlap(footLeft, footRight, x, x + width) >= stepSupportOverlap
    )
    .map(({ y }) => y)

  const directionalMatches = matches
    .filter((y) =>
      direction > 0
        ? y < currentSurfaceY - supportTolerance
        : y > currentSurfaceY + supportTolerance
    )
    .sort((a, b) => (direction > 0 ? a - b : b - a))

  return (
    directionalMatches[0] ??
    matches.sort(
      (a, b) => Math.abs(a - currentSurfaceY) - Math.abs(b - currentSurfaceY) || a - b
    )[0] ??
    null
  )
}

const findLandingSurface = (position: Position, previousY: number, sprite: PlayerSprite) => {
  const inset = getInset(sprite)
  const footLeft = position.x + inset
  const footRight = position.x + sprite.width - inset
  const previousBottom = previousY + sprite.height
  const nextBottom = position.y + sprite.height
  const matches = surfaces
    .filter(
      ({ x, y, width }) =>
        previousBottom <= y + supportTolerance &&
        nextBottom >= y &&
        getOverlap(footLeft, footRight, x, x + width) >= supportOverlap
    )
    .map(({ y }) => y)

  return matches.length > 0 ? Math.min(...matches) : null
}

const getPipeCenteredPlayerX = (pipe: Pick<Rect, 'x'>, sprite: PlayerSprite) =>
  pipe.x + tile - sprite.width / 2

const canExitThroughRightPipe = (position: Position, sprite: PlayerSprite, velocityY: number) => {
  const centerX = position.x + sprite.width / 2
  const top = position.y
  const bottom = position.y + sprite.height

  return (
    velocityY < 0 &&
    centerX >= rightExitPipe.x + pipeExitMouthPadding &&
    centerX <= rightExitPipe.x + tile * 2 - pipeExitMouthPadding &&
    top <= pipeExitMouthY + pipeExitMouthTolerance &&
    bottom >= pipeExitMouthY - pipeExitMouthTolerance
  )
}

const resolveCeiling = (position: Position, sprite: PlayerSprite) => {
  const hits = solidCells.filter((solid) => overlaps(position, sprite, solid))
  if (hits.length === 0) return position.y

  return Math.max(...hits.map(({ y, height }) => y + height)) - 6
}

const resolveSolidOverlap = (
  position: Position,
  previousY: number,
  sprite: PlayerSprite,
  minX: number,
  maxX: number,
  falling: boolean
) => {
  const hits = solidCells.filter((solid) => overlaps(position, sprite, solid))
  if (hits.length === 0) return { position, grounded: false }

  const inset = getInset(sprite)
  const footLeft = position.x + inset
  const footRight = position.x + sprite.width - inset

  if (falling) {
    const previousBottom = previousY + sprite.height
    const landingHits = surfaces.filter(
      ({ x, y, width }) =>
        previousBottom <= y + tile &&
        getOverlap(footLeft, footRight, x, x + width) >= supportOverlap
    )

    if (landingHits.length > 0) {
      return {
        position: {
          x: position.x,
          y: Math.min(...landingHits.map(({ y }) => y)) - sprite.height,
        },
        grounded: true,
      }
    }
  }

  const player = getPlayerRect(position, sprite)
  const leftX = Math.min(...hits.map(({ x }) => x)) - sprite.width + inset
  const rightX = Math.max(...hits.map(({ x, width }) => x + width)) - inset
  const leftDistance = Math.abs(player.right - Math.min(...hits.map(({ x }) => x)))
  const rightDistance = Math.abs(player.left - Math.max(...hits.map(({ x, width }) => x + width)))

  return {
    position: {
      x: clamp(leftDistance <= rightDistance ? leftX : rightX, minX, maxX),
      y: position.y,
    },
    grounded: false,
  }
}

const resolveHorizontalStep = (
  currentX: number,
  targetX: number,
  y: number,
  sprite: PlayerSprite,
  minX: number,
  maxX: number
) => {
  const nextX = clamp(targetX, minX, maxX)
  const hits = solidCells.filter((solid) => overlaps({ x: nextX, y }, sprite, solid))
  if (hits.length === 0) return nextX

  const inset = getInset(sprite)

  if (nextX > currentX) {
    return clamp(Math.min(...hits.map(({ x }) => x)) - sprite.width + inset, minX, maxX)
  }

  return clamp(Math.max(...hits.map(({ x, width }) => x + width)) - inset, minX, maxX)
}

const resolveHorizontal = (
  currentX: number,
  targetX: number,
  y: number,
  sprite: PlayerSprite,
  minX: number,
  maxX: number
) => {
  const direction = Math.sign(targetX - currentX)
  if (direction === 0) return currentX

  let nextX = currentX
  const clampedTarget = clamp(targetX, minX, maxX)

  while (Math.abs(clampedTarget - nextX) > 0.5) {
    const distance = Math.min(collisionStep, Math.abs(clampedTarget - nextX))
    const stepTarget = nextX + distance * direction
    const steppedX = resolveHorizontalStep(nextX, stepTarget, y, sprite, minX, maxX)

    if (
      Math.abs(steppedX - nextX) < 0.5 ||
      (direction > 0 && steppedX < stepTarget - 0.5) ||
      (direction < 0 && steppedX > stepTarget + 0.5)
    ) {
      return steppedX
    }

    nextX = steppedX
  }

  return nextX
}

const resolveSurfaceFollowMovement = (
  current: Position,
  targetX: number,
  sprite: PlayerSprite,
  minX: number,
  maxX: number
) => {
  const direction = Math.sign(targetX - current.x)
  if (direction === 0) return { position: current, grounded: true }

  let next = current
  const clampedTarget = clamp(targetX, minX, maxX)

  while (Math.abs(clampedTarget - next.x) > 0.5) {
    const distance = Math.min(collisionStep, Math.abs(clampedTarget - next.x))
    const stepTargetX = next.x + distance * direction
    const currentSurfaceY = next.y + sprite.height
    const stepSurface = findStepSurface(
      { x: stepTargetX, y: next.y },
      currentSurfaceY,
      sprite,
      direction
    )

    if (stepSurface !== null) {
      next = { x: stepTargetX, y: stepSurface - sprite.height }
      continue
    }

    const steppedX = resolveHorizontalStep(next.x, stepTargetX, next.y, sprite, minX, maxX)

    if (
      Math.abs(steppedX - next.x) < 0.5 ||
      (direction > 0 && steppedX < stepTargetX - 0.5) ||
      (direction < 0 && steppedX > stepTargetX + 0.5)
    ) {
      return {
        position: { x: steppedX, y: next.y },
        grounded: findStandingSurface({ x: steppedX, y: next.y }, sprite) !== null,
      }
    }

    return {
      position: { x: stepTargetX, y: next.y },
      grounded: false,
    }
  }

  return {
    position: next,
    grounded: findStandingSurface(next, sprite) !== null,
  }
}

const WallRun = ({ x, y, width, height }: Rect) => (
  <Box
    aria-hidden={'true'}
    position={'absolute'}
    left={x + 'px'}
    top={y + 'px'}
    w={width + 'px'}
    h={height + 'px'}
    bgImage={'url("/images/wall/wall.png")'}
    bgRepeat={'repeat'}
    bgSize={`${tile}px ${tile}px`}
    sx={{ imageRendering: 'pixelated' }}
  />
)

const PipeRoom = ({ character, onExit, variant }: PipeRoomProps) => {
  const { playAudio } = useAudio()
  const { width, height } = useWindow()
  const sprite = sprites[variant]
  const roomLeft = Math.round((width - roomWidth) / 2)
  const roomTop = 0
  const gridStart = getGridStart(roomLeft)
  const gridEnd = getGridEnd(width, gridStart)
  const { minX, maxX } = getMovementBounds(sprite)
  const [position, setPosition] = useState<Position>({
    x: clamp(getPipeCenteredPlayerX(leftEntryPipe, sprite), minX, maxX),
    y: -sprite.height - tile,
  })
  const positionRef = useRef(position)
  const velocityYRef = useRef(0)
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const exitFrameRef = useRef<number | null>(null)
  const exitingRef = useRef(false)
  const groundedRef = useRef(false)
  const keysRef = useRef(new Set<string>())
  const crouchingRef = useRef(false)
  const facingRef = useRef(true)
  const frameRef = useRef<number | null>(null)
  const roomRef = useRef<HTMLDivElement | null>(null)
  const [exiting, setExiting] = useState(false)
  const [crouching, setCrouching] = useState(false)
  const [exitTop, setExitTop] = useState<number | null>(null)
  const outsideWalls = useMemo(
    () =>
      [
        {
          id: 'outside-left',
          x: gridStart,
          y: 0,
          width: Math.max(0, roomLeft - gridStart),
          height: roomHeight,
        },
        {
          id: 'outside-right',
          x: roomLeft + roomWidth,
          y: 0,
          width: Math.max(0, gridEnd - roomLeft - roomWidth),
          height: roomHeight,
        },
        {
          id: 'outside-bottom',
          x: gridStart,
          y: roomHeight,
          width: Math.max(0, gridEnd - gridStart),
          height: getGridHeight(height + tile, roomHeight),
        },
      ].filter(({ width }) => width > 0),
    [gridEnd, gridStart, height, roomLeft]
  )
  const crouchingFrame = crouching && sprite.name !== 'regular' && groundedRef.current && !exiting
  const frame = crouchingFrame
    ? 3
    : groundedRef.current
      ? Math.floor(Math.abs(position.x) / 72) % 2
      : 2
  const playerTransform = !facingRef.current ? 'scaleX(-1)' : undefined
  const playerTop = exitTop ?? position.y

  const syncPosition = useCallback((next: Position) => {
    positionRef.current = next
    setPosition(next)
  }, [])

  const syncCrouching = useCallback((next: boolean) => {
    crouchingRef.current = next
    setCrouching(next)
  }, [])

  const startExit = useCallback(
    (startPosition = positionRef.current) => {
      if (exitingRef.current) return

      const centeredX = getPipeCenteredPlayerX(rightExitPipe, sprite)
      const visibleStartY = clamp(
        startPosition.y,
        pipeExitMouthY - sprite.height + pipeExitMouthTolerance,
        pipeExitMouthY + pipeExitMouthTolerance
      )
      const travel = Math.max(defaultPipeExitTravel, visibleStartY + sprite.height + tile)

      exitingRef.current = true
      keysRef.current.clear()
      syncCrouching(false)
      facingRef.current = true
      velocityYRef.current = 0
      groundedRef.current = false
      setExitTop(null)
      syncPosition({
        x: centeredX,
        y: visibleStartY,
      })
      setExiting(true)
      exitFrameRef.current = requestAnimationFrame(() => {
        exitFrameRef.current = null
        setExitTop(visibleStartY - travel)
      })
      playAudio('pipe')

      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
      exitTimeoutRef.current = setTimeout(() => {
        exitTimeoutRef.current = null
        onExit()
      }, pipeExitDelay)
    },
    [onExit, playAudio, sprite, syncCrouching, syncPosition]
  )

  useEffect(() => {
    if (sprite.name === 'regular') syncCrouching(false)
  }, [sprite.name, syncCrouching])

  useEffect(() => {
    const current = positionRef.current
    const nextX = clamp(current.x, minX, maxX)
    const standingSurface = findStandingSurface({ x: nextX, y: current.y }, sprite)

    syncPosition({
      x: nextX,
      y: standingSurface === null ? current.y : standingSurface - sprite.height,
    })
  }, [maxX, minX, sprite, syncPosition])

  useEffect(() => {
    let lastFrame = performance.now()

    const tick = (time: number) => {
      if (exitingRef.current) {
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      const scale = Math.min(2, Math.max(0.5, (time - lastFrame) / 16.67))
      lastFrame = time
      const current = positionRef.current
      const keys = keysRef.current
      const crouching = crouchingRef.current && sprite.name !== 'regular' && groundedRef.current
      let nextX = current.x
      let nextY = current.y
      let moved = false

      if (!crouching && keys.has('ArrowLeft') && !keys.has('ArrowRight')) {
        if (groundedRef.current && velocityYRef.current === 0) {
          const resolved = resolveSurfaceFollowMovement(
            { x: nextX, y: nextY },
            nextX - moveSpeed * scale,
            sprite,
            minX,
            maxX
          )
          nextX = resolved.position.x
          nextY = resolved.position.y
          groundedRef.current = resolved.grounded
        } else {
          nextX = resolveHorizontal(nextX, nextX - moveSpeed * scale, current.y, sprite, minX, maxX)
        }
        facingRef.current = false
        moved = true
      }

      if (!crouching && keys.has('ArrowRight') && !keys.has('ArrowLeft')) {
        if (groundedRef.current && velocityYRef.current === 0) {
          const resolved = resolveSurfaceFollowMovement(
            { x: nextX, y: nextY },
            nextX + moveSpeed * scale,
            sprite,
            minX,
            maxX
          )
          nextX = resolved.position.x
          nextY = resolved.position.y
          groundedRef.current = resolved.grounded
        } else {
          nextX = resolveHorizontal(nextX, nextX + moveSpeed * scale, current.y, sprite, minX, maxX)
        }
        facingRef.current = true
        moved = true
      }

      if (groundedRef.current) {
        const standingSurface = findStandingSurface({ x: nextX, y: nextY }, sprite)

        if (standingSurface === null) {
          groundedRef.current = false
        } else {
          nextY = standingSurface - sprite.height
        }
      }

      if (!groundedRef.current || velocityYRef.current !== 0) {
        const previousY = nextY
        velocityYRef.current += gravity * scale
        nextY += velocityYRef.current * scale
        moved = true

        if (velocityYRef.current >= 0) {
          const landingSurface = findLandingSurface({ x: nextX, y: nextY }, previousY, sprite)

          if (landingSurface !== null) {
            nextY = landingSurface - sprite.height
            velocityYRef.current = 0
            groundedRef.current = true
          }
        } else {
          const resolvedY = resolveCeiling({ x: nextX, y: nextY }, sprite)

          if (resolvedY !== nextY) {
            nextY = resolvedY
            velocityYRef.current = 0
          }
        }

        const resolved = resolveSolidOverlap(
          { x: nextX, y: nextY },
          previousY,
          sprite,
          minX,
          maxX,
          velocityYRef.current >= 0
        )

        nextX = resolved.position.x
        nextY = resolved.position.y

        if (resolved.grounded) {
          velocityYRef.current = 0
          groundedRef.current = true
        }
      }

      if (canExitThroughRightPipe({ x: nextX, y: nextY }, sprite, velocityYRef.current)) {
        startExit({ x: nextX, y: nextY })
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      if (moved) syncPosition({ x: nextX, y: nextY })

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [maxX, minX, sprite, startExit, syncPosition])

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
      if (exitFrameRef.current !== null) cancelAnimationFrame(exitFrameRef.current)
    }
  }, [])

  useEffect(() => {
    const jump = () => {
      if (!groundedRef.current || crouchingRef.current) return

      groundedRef.current = false
      velocityYRef.current = jumpVelocity
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.code !== 'ArrowLeft' &&
        event.code !== 'ArrowRight' &&
        event.code !== 'ArrowDown' &&
        event.code !== 'ArrowUp' &&
        event.code !== 'Space'
      ) {
        return
      }

      event.preventDefault()
      if (exitingRef.current) return

      keysRef.current.add(event.code)

      if (event.code === 'ArrowDown') {
        if (sprite.name !== 'regular' && groundedRef.current) syncCrouching(true)
        return
      }

      if (event.code === 'ArrowUp' || event.code === 'Space') jump()
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (
        event.code !== 'ArrowLeft' &&
        event.code !== 'ArrowRight' &&
        event.code !== 'ArrowDown' &&
        event.code !== 'ArrowUp' &&
        event.code !== 'Space'
      ) {
        return
      }

      event.preventDefault()
      keysRef.current.delete(event.code)

      if (event.code === 'ArrowDown') syncCrouching(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [sprite.name, syncCrouching])

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (delta === 0) return

      event.preventDefault()
      if (exitingRef.current) return

      const current = positionRef.current
      const resolved =
        groundedRef.current && velocityYRef.current === 0
          ? resolveSurfaceFollowMovement(
              current,
              current.x + delta * wheelSpeed,
              sprite,
              minX,
              maxX
            )
          : {
              position: {
                x: resolveHorizontal(
                  current.x,
                  current.x + delta * wheelSpeed,
                  current.y,
                  sprite,
                  minX,
                  maxX
                ),
                y: current.y,
              },
              grounded: groundedRef.current,
            }
      const nextX = resolved.position.x
      const nextY = resolved.position.y

      if (nextX === current.x && nextY === current.y) return

      facingRef.current = nextX > current.x

      if (groundedRef.current) {
        const standingSurface = findStandingSurface({ x: nextX, y: nextY }, sprite)

        if (standingSurface !== null) {
          groundedRef.current = true
          syncPosition({ x: nextX, y: standingSurface - sprite.height })
          return
        }

        groundedRef.current = false
      }

      groundedRef.current = resolved.grounded
      syncPosition({ x: nextX, y: nextY })
    },
    [maxX, minX, sprite, syncPosition]
  )

  useEffect(() => {
    const room = roomRef.current
    if (!room) return

    room.addEventListener('wheel', handleWheel, { passive: false })

    return () => room.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  return (
    <Box
      ref={roomRef}
      aria-label={'pipe room'}
      position={'fixed'}
      inset={0}
      zIndex={50}
      overflow={'hidden'}
      bg={'black'}
      pointerEvents={'auto'}
    >
      {outsideWalls.map((region) => (
        <WallRun key={region.id} {...region} />
      ))}

      <Box
        aria-label={'pipe room chamber'}
        position={'absolute'}
        left={roomLeft + 'px'}
        top={roomTop + 'px'}
        w={roomWidth + 'px'}
        h={roomHeight + 'px'}
        overflow={'hidden'}
        bg={'black'}
      >
        {wallRuns.map((region) => (
          <WallRun key={region.id} {...region} />
        ))}

        <Box
          aria-hidden={'true'}
          position={'absolute'}
          left={tile * 9 + 'px'}
          top={tile * 3 + 'px'}
          zIndex={1}
          pointerEvents={'none'}
        >
          {amazeLines.map((text, index) => (
            <Heading
              key={index}
              as={'h2'}
              color={'green.500'}
              fontSize={'64px'}
              fontWeight={'black'}
              letterSpacing={0}
              lineHeight={'72px'}
              textTransform={'uppercase'}
            >
              {text}
            </Heading>
          ))}
        </Box>

        {topPipes.map(({ id, x, y }) => (
          <Pipe
            key={id}
            animateEntry={false}
            direction={'down'}
            height={tile * 2}
            placement={'top'}
            skin={'alt'}
            x={x}
            y={y}
            zIndex={4}
          />
        ))}

        <Box
          position={'absolute'}
          left={position.x + 'px'}
          top={playerTop + 'px'}
          w={sprite.width + 'px'}
          h={sprite.height + 'px'}
          zIndex={exiting ? 2 : 3}
          transform={playerTransform}
          transformOrigin={'center'}
          transition={exiting ? `top ${pipeExitDelay}ms ease-in, left 120ms linear` : undefined}
        >
          <Box
            aria-label={`${character} pipe room player`}
            role={'img'}
            w={sprite.width + 'px'}
            h={sprite.height + 'px'}
            bgImage={`url("/images/${character}/${character}.${sprite.name}.sprite.png")`}
            bgPosition={`-${frame * sprite.width}px 0`}
            bgRepeat={'no-repeat'}
            bgSize={`${sprite.width * sprite.frames}px ${sprite.height}px`}
            sx={{ imageRendering: 'pixelated' }}
          />
        </Box>
      </Box>

      <Footer animated={false} dark />
    </Box>
  )
}

export default PipeRoom
