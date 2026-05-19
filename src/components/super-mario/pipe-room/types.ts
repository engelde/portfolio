import type { PipeProps } from '../foreground/pipe'

export type PipeRoomId = 'default'

export type PlayerSprite = {
  name: 'regular' | 'super' | 'raccoon'
  width: number
  height: number
  frames: number
}

export type Position = {
  x: number
  y: number
}

export type Rect = {
  id: string
  x: number
  y: number
  width: number
  height: number
}

export type Surface = Pick<Rect, 'id' | 'x' | 'y' | 'width'>

export type PipeRoomAssets = {
  wall: string
}

export type PipeRoomBounds = {
  minColumn: number
  maxColumn: number
}

export type PipeRoomPipe = Pick<
  PipeProps,
  'direction' | 'height' | 'placement' | 'skin' | 'x' | 'y' | 'zIndex'
> & {
  id: string
}

export type PipeRoomEntrance = {
  id: string
  pipeId: string
}

export type PipeRoomExit = {
  id: string
  mouthPadding: number
  mouthTolerance: number
  mouthY: number
  pipeId: string
  targetOverworldPipeId: string
}

export type PipeRoomCoin = {
  id: string
  value?: number
  x: number
  y: number
}

export type PipeRoomPrizeBox = {
  id: string
  prize?: 'coin' | 'leaf' | 'mushroom' | 'one-up'
  x: number
  y: number
}

export type PipeRoomMessageForm = {
  height: number
  width: number
  x: number
  y: number
}

export type PipeRoomStairStep = {
  x: number
  y: number
}

export type PipeRoomStairPath = {
  direction: 'left' | 'right'
  hopHeight?: number
  id: string
  stepDurationMs?: number
  steps: PipeRoomStairStep[]
}

export type PipeRoomConfig = {
  assets: PipeRoomAssets
  bounds: PipeRoomBounds
  coins: PipeRoomCoin[]
  entrances: PipeRoomEntrance[]
  exits: PipeRoomExit[]
  id: PipeRoomId
  map: string[]
  messageForm?: PipeRoomMessageForm
  pipes: PipeRoomPipe[]
  prizeBoxes: PipeRoomPrizeBox[]
  stairPaths: PipeRoomStairPath[]
  tileSize: number
}

export type ResolvedPipeRoomEntrance = PipeRoomEntrance & {
  pipe: PipeRoomPipe
}

export type ResolvedPipeRoomExit = PipeRoomExit & {
  pipe: PipeRoomPipe
}

export type PipeRoomLayout = PipeRoomConfig & {
  columns: number
  entrance: ResolvedPipeRoomEntrance
  exit: ResolvedPipeRoomExit
  height: number
  rows: number
  solidCells: Rect[]
  surfaces: Surface[]
  wallRuns: Rect[]
  width: number
}

export const playerSprites = {
  1: { name: 'regular', width: 100, height: 100, frames: 3 },
  2: { name: 'super', width: 80, height: 160, frames: 4 },
  3: { name: 'raccoon', width: 120, height: 160, frames: 4 },
} satisfies Record<1 | 2 | 3, PlayerSprite>
