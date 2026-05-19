import type {
  PipeRoomExit,
  PipeRoomLayout,
  PipeRoomPipe,
  PlayerSprite,
  Position,
  Rect,
} from './types'

export const collisionStep = 8
export const supportOverlap = 20
export const supportTolerance = 3

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export const getInset = (sprite: PlayerSprite) =>
  Math.min(20, Math.max(10, Math.round(sprite.width * 0.18)))

export const getMovementBounds = (layout: PipeRoomLayout, sprite: PlayerSprite) => {
  const inset = getInset(sprite)

  return {
    minX: layout.bounds.minColumn * layout.tileSize - inset,
    maxX: layout.bounds.maxColumn * layout.tileSize - sprite.width + inset,
  }
}

export const getPipeCenteredPlayerX = (
  pipe: Pick<PipeRoomPipe, 'x'>,
  tileSize: number,
  sprite: PlayerSprite
) => pipe.x + tileSize - sprite.width / 2

export const getPlayerRect = (position: Position, sprite: PlayerSprite) => {
  const inset = getInset(sprite)

  return {
    left: position.x + inset,
    right: position.x + sprite.width - inset,
    top: position.y + 6,
    bottom: position.y + sprite.height - 1,
  }
}

export const getOverlap = (aStart: number, aEnd: number, bStart: number, bEnd: number) =>
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

export const findStandingSurface = (
  layout: PipeRoomLayout,
  position: Position,
  sprite: PlayerSprite
) => {
  const inset = getInset(sprite)
  const footLeft = position.x + inset
  const footRight = position.x + sprite.width - inset
  const footY = position.y + sprite.height
  const matches = layout.surfaces
    .filter(
      ({ x, y, width }) =>
        Math.abs(y - footY) <= supportTolerance &&
        getOverlap(footLeft, footRight, x, x + width) >= supportOverlap
    )
    .map(({ y }) => y)

  return matches.length > 0 ? Math.min(...matches) : null
}

const findStepSurface = (
  layout: PipeRoomLayout,
  position: Position,
  currentSurfaceY: number,
  sprite: PlayerSprite,
  direction: number
) => {
  const inset = getInset(sprite)
  const footLeft = position.x + inset
  const footRight = position.x + sprite.width - inset
  const footWidth = footRight - footLeft
  const stepSupportOverlap = Math.min(28, Math.max(18, Math.round(footWidth * 0.35)))
  const matches = layout.surfaces
    .filter(
      ({ x, y, width }) =>
        Math.abs(y - currentSurfaceY) <= layout.tileSize + supportTolerance &&
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

export const findLandingSurface = (
  layout: PipeRoomLayout,
  position: Position,
  previousY: number,
  sprite: PlayerSprite
) => {
  const inset = getInset(sprite)
  const footLeft = position.x + inset
  const footRight = position.x + sprite.width - inset
  const previousBottom = previousY + sprite.height
  const nextBottom = position.y + sprite.height
  const matches = layout.surfaces
    .filter(
      ({ x, y, width }) =>
        previousBottom <= y + supportTolerance &&
        nextBottom >= y &&
        getOverlap(footLeft, footRight, x, x + width) >= supportOverlap
    )
    .map(({ y }) => y)

  return matches.length > 0 ? Math.min(...matches) : null
}

export const canExitThroughPipe = (
  position: Position,
  sprite: PlayerSprite,
  velocityY: number,
  exit: PipeRoomExit & { pipe: PipeRoomPipe },
  tileSize: number
) => {
  const centerX = position.x + sprite.width / 2
  const top = position.y
  const bottom = position.y + sprite.height

  return (
    velocityY < 0 &&
    centerX >= exit.pipe.x + exit.mouthPadding &&
    centerX <= exit.pipe.x + tileSize * 2 - exit.mouthPadding &&
    top <= exit.mouthY + exit.mouthTolerance &&
    bottom >= exit.mouthY - exit.mouthTolerance
  )
}

export const resolveCeiling = (
  layout: PipeRoomLayout,
  position: Position,
  sprite: PlayerSprite
) => {
  const hits = layout.solidCells.filter((solid) => overlaps(position, sprite, solid))
  if (hits.length === 0) return position.y

  return Math.max(...hits.map(({ y, height }) => y + height)) - 6
}

export const resolveSolidOverlap = (
  layout: PipeRoomLayout,
  position: Position,
  previousY: number,
  sprite: PlayerSprite,
  minX: number,
  maxX: number,
  falling: boolean
) => {
  const hits = layout.solidCells.filter((solid) => overlaps(position, sprite, solid))
  if (hits.length === 0) return { position, grounded: false }

  const inset = getInset(sprite)
  const footLeft = position.x + inset
  const footRight = position.x + sprite.width - inset

  if (falling) {
    const previousBottom = previousY + sprite.height
    const landingHits = layout.surfaces.filter(
      ({ x, y, width }) =>
        previousBottom <= y + layout.tileSize &&
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
  layout: PipeRoomLayout,
  currentX: number,
  targetX: number,
  y: number,
  sprite: PlayerSprite,
  minX: number,
  maxX: number
) => {
  const nextX = clamp(targetX, minX, maxX)
  const hits = layout.solidCells.filter((solid) => overlaps({ x: nextX, y }, sprite, solid))
  if (hits.length === 0) return nextX

  const inset = getInset(sprite)

  if (nextX > currentX) {
    return clamp(Math.min(...hits.map(({ x }) => x)) - sprite.width + inset, minX, maxX)
  }

  return clamp(Math.max(...hits.map(({ x, width }) => x + width)) - inset, minX, maxX)
}

export const resolveHorizontal = (
  layout: PipeRoomLayout,
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
    const steppedX = resolveHorizontalStep(layout, nextX, stepTarget, y, sprite, minX, maxX)

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

export const resolveSurfaceFollowMovement = (
  layout: PipeRoomLayout,
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
      layout,
      { x: stepTargetX, y: next.y },
      currentSurfaceY,
      sprite,
      direction
    )

    if (stepSurface !== null) {
      next = { x: stepTargetX, y: stepSurface - sprite.height }
      continue
    }

    const steppedX = resolveHorizontalStep(layout, next.x, stepTargetX, next.y, sprite, minX, maxX)

    if (
      Math.abs(steppedX - next.x) < 0.5 ||
      (direction > 0 && steppedX < stepTargetX - 0.5) ||
      (direction < 0 && steppedX > stepTargetX + 0.5)
    ) {
      return {
        position: { x: steppedX, y: next.y },
        grounded: findStandingSurface(layout, { x: steppedX, y: next.y }, sprite) !== null,
      }
    }

    return {
      position: { x: stepTargetX, y: next.y },
      grounded: false,
    }
  }

  return {
    position: next,
    grounded: findStandingSurface(layout, next, sprite) !== null,
  }
}
