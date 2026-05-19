import rawLevelMap from './level-map.json'

export type MarioVariant = 1 | 2 | 3

export type LevelPoint = {
  id: string
  x: number
  y: number
}

export type GroundSegment = {
  id: string
  x: number
  width: number
  height: number
}

export type CubeSegment = LevelPoint & {
  variant: 1 | 2 | 3 | 4 | 5
}

export type PipeSegment = LevelPoint & {
  height: number
  plant?: boolean
  plantVariant?: 1 | 2
  active?: boolean
  activeWhenBeforeX?: number
  collisionTop?: boolean
}

export type FinalPipeSegment = LevelPoint & {
  height: number
  rotate: number
}

export type CoinSegment = {
  id: number
  x: number
  y: number
}

export type EnemySegment = LevelPoint & {
  offset: number
}

export type TurtleVariant = 'normal' | 'alt'

export type TurtleSegment = EnemySegment & {
  variant?: TurtleVariant
}

export type CollisionSurface = {
  id: string
  owner: string
  kind: 'ground' | 'platform' | 'box' | 'pipe' | 'brick'
  xMin: number
  xMax: number
  height: number
}

export type CollisionCeiling = {
  id: string
  owner: string
  xMin: number
  xMax: number
  height: number
}

type LevelMap = {
  length: number
  grounds: GroundSegment[]
  cubes: CubeSegment[]
  rocks: LevelPoint[]
  bricks: LevelPoint[]
  pipes: PipeSegment[]
  finalPipe: FinalPipeSegment
  coins: CoinSegment[]
  prizeBoxes: CoinSegment[]
  goombas: EnemySegment[]
  turtles: TurtleSegment[]
  collisionSurfaces: CollisionSurface[]
  collisionCeilings: CollisionCeiling[]
}

export const levelMap = rawLevelMap as LevelMap
export const levelLength = levelMap.length
export const groundSegments = levelMap.grounds
export const cubeSegments = levelMap.cubes
export const rockSegments = levelMap.rocks
export const brickSegments = levelMap.bricks
export const pipeSegments = levelMap.pipes
export const finalPipe = levelMap.finalPipe
export const coinSegments = levelMap.coins
export const prizeBoxSegments = levelMap.prizeBoxes
export const goombaSegments = levelMap.goombas
export const turtleSegments = levelMap.turtles
export const collisionSurfaces = levelMap.collisionSurfaces
export const collisionCeilings = levelMap.collisionCeilings
export const collisionEdgeTolerance = 16

export type MarioFootprint = {
  left: number
  right: number
  width: number
}

const marioFootMetrics = {
  1: {
    forward: { left: 14, right: 78 },
    backward: { left: 22, right: 86 },
    crouch: { left: 14, right: 78 },
  },
  2: {
    forward: { left: 10, right: 70 },
    backward: { left: 10, right: 70 },
    crouch: { left: 6, right: 74 },
  },
  3: {
    forward: { left: 28, right: 94 },
    backward: { left: 26, right: 92 },
    crouch: { left: 18, right: 102 },
  },
} satisfies Record<
  MarioVariant,
  Record<'forward' | 'backward' | 'crouch', { left: number; right: number }>
>

export const getMarioFootprint = (
  worldX: number,
  variant: MarioVariant,
  forwards: boolean,
  crouching: boolean
): MarioFootprint => {
  const metric =
    crouching && variant !== 1
      ? marioFootMetrics[variant].crouch
      : forwards
        ? marioFootMetrics[variant].forward
        : marioFootMetrics[variant].backward
  const left = worldX + metric.left
  const right = worldX + metric.right
  return { left, right, width: right - left }
}

export const getSurfaceOverlapRatio = (surface: CollisionSurface, footprint: MarioFootprint) => {
  const overlap = Math.max(
    0,
    Math.min(surface.xMax + collisionEdgeTolerance, footprint.right) -
      Math.max(surface.xMin - collisionEdgeTolerance, footprint.left)
  )
  return overlap / footprint.width
}

const surfaceSupportsFootprint = (
  surface: CollisionSurface,
  footprint: MarioFootprint,
  minimumOverlap = 0.5
) => getSurfaceOverlapRatio(surface, footprint) >= minimumOverlap

export const findSupportSurface = (
  surfaces: CollisionSurface[],
  worldX: number,
  feetY: number,
  variant: MarioVariant,
  forwards: boolean,
  crouching: boolean,
  tolerance = 3
) => {
  const footprint = getMarioFootprint(worldX, variant, forwards, crouching)
  return surfaces
    .filter(
      (surface) =>
        Math.abs(surface.height - feetY) <= tolerance &&
        surfaceSupportsFootprint(surface, footprint)
    )
    .sort((a, b) => b.height - a.height)[0]
}

export const findLandingSurface = (
  surfaces: CollisionSurface[],
  worldX: number,
  previousFeetY: number,
  currentFeetY: number,
  variant: MarioVariant,
  forwards: boolean,
  crouching: boolean
) => {
  const footprint = getMarioFootprint(worldX, variant, forwards, crouching)
  return surfaces
    .filter(
      (surface) =>
        surfaceSupportsFootprint(surface, footprint) &&
        previousFeetY >= surface.height - 2 &&
        currentFeetY <= surface.height + 2
    )
    .sort((a, b) => b.height - a.height)[0]
}

export const findStepSurface = (
  surfaces: CollisionSurface[],
  worldX: number,
  currentFeetY: number,
  variant: MarioVariant,
  forwards: boolean,
  crouching: boolean,
  maxStep = 96
) => {
  const footprint = getMarioFootprint(worldX, variant, forwards, crouching)
  return surfaces
    .filter(
      (surface) =>
        surfaceSupportsFootprint(surface, footprint) &&
        Math.abs(surface.height - currentFeetY) <= maxStep
    )
    .sort((a, b) => Math.abs(a.height - currentFeetY) - Math.abs(b.height - currentFeetY))[0]
}

export const getLowestGroundHeight = (
  surfaces: CollisionSurface[],
  worldX: number,
  variant: MarioVariant,
  forwards: boolean,
  crouching: boolean
) => {
  const footprint = getMarioFootprint(worldX, variant, forwards, crouching)
  return (
    surfaces
      .filter(
        (surface) => surface.kind === 'ground' && surfaceSupportsFootprint(surface, footprint, 0.2)
      )
      .sort((a, b) => b.height - a.height)[0]?.height ?? 0
  )
}
