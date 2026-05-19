import type {
  PipeRoomConfig,
  PipeRoomLayout,
  Rect,
  ResolvedPipeRoomEntrance,
  ResolvedPipeRoomExit,
} from './types'

const cellRect = (id: string, column: number, row: number, tileSize: number): Rect => ({
  id,
  x: column * tileSize,
  y: row * tileSize,
  width: tileSize,
  height: tileSize,
})

const buildWallRuns = (room: PipeRoomConfig) => {
  const runs: Rect[] = []

  room.map.forEach((row, rowIndex) => {
    let runStart: number | null = null

    Array.from(row + '.').forEach((cell, columnIndex) => {
      if (cell === '#') {
        runStart ??= columnIndex
        return
      }

      if (runStart === null) return

      runs.push({
        id: `wall-${rowIndex}-${runStart}`,
        x: runStart * room.tileSize,
        y: rowIndex * room.tileSize,
        width: (columnIndex - runStart) * room.tileSize,
        height: room.tileSize,
      })
      runStart = null
    })
  })

  return runs
}

const buildSolidCells = (room: PipeRoomConfig) => {
  const cells = new Map<string, Rect>()
  const addCell = (column: number, row: number, id = `solid-${row}-${column}`) => {
    cells.set(`${column}-${row}`, cellRect(id, column, row, room.tileSize))
  }

  room.map.forEach((row, rowIndex) => {
    Array.from(row).forEach((cell, columnIndex) => {
      if (cell === '#') addCell(columnIndex, rowIndex)
    })
  })

  return Array.from(cells.values())
}

const resolveEntrance = (room: PipeRoomConfig): ResolvedPipeRoomEntrance => {
  const entrance = room.entrances[0]
  const pipe = entrance && room.pipes.find(({ id }) => id === entrance.pipeId)

  if (!entrance || !pipe) {
    throw new Error(`Pipe room "${room.id}" must define a valid entrance pipe.`)
  }

  return { ...entrance, pipe }
}

const resolveExit = (room: PipeRoomConfig): ResolvedPipeRoomExit => {
  const exit = room.exits[0]
  const pipe = exit && room.pipes.find(({ id }) => id === exit.pipeId)

  if (!exit || !pipe) {
    throw new Error(`Pipe room "${room.id}" must define a valid exit pipe.`)
  }

  return { ...exit, pipe }
}

export const getGridStart = (roomLeft: number, tileSize: number) =>
  roomLeft - Math.ceil(roomLeft / tileSize) * tileSize

export const getGridEnd = (width: number, gridStart: number, tileSize: number) =>
  gridStart + Math.ceil((width - gridStart) / tileSize) * tileSize

export const getGridHeight = (height: number, top: number, tileSize: number) =>
  Math.max(0, Math.ceil((height - top) / tileSize) * tileSize)

export const getOutsideWallRuns = (
  layout: PipeRoomLayout,
  roomLeft: number,
  viewportWidth: number,
  viewportHeight: number
) => {
  const gridStart = getGridStart(roomLeft, layout.tileSize)
  const gridEnd = getGridEnd(viewportWidth, gridStart, layout.tileSize)

  return [
    {
      id: 'outside-left',
      x: gridStart,
      y: 0,
      width: Math.max(0, roomLeft - gridStart),
      height: layout.height,
    },
    {
      id: 'outside-right',
      x: roomLeft + layout.width,
      y: 0,
      width: Math.max(0, gridEnd - roomLeft - layout.width),
      height: layout.height,
    },
    {
      id: 'outside-bottom',
      x: gridStart,
      y: layout.height,
      width: Math.max(0, gridEnd - gridStart),
      height: getGridHeight(viewportHeight + layout.tileSize, layout.height, layout.tileSize),
    },
  ].filter(({ width }) => width > 0)
}

export const createPipeRoomLayout = (room: PipeRoomConfig): PipeRoomLayout => {
  const columns = room.map[0]?.length ?? 0
  const rows = room.map.length
  const solidCells = buildSolidCells(room)
  const solidCellKeys = new Set(
    solidCells.map(({ x, y }) => `${x / room.tileSize}-${y / room.tileSize}`)
  )
  const surfaces = solidCells
    .filter(
      ({ x, y }) => y > 0 && !solidCellKeys.has(`${x / room.tileSize}-${y / room.tileSize - 1}`)
    )
    .map(({ id, x, y, width }) => ({ id, x, y, width }))

  return {
    ...room,
    columns,
    rows,
    width: columns * room.tileSize,
    height: rows * room.tileSize,
    wallRuns: buildWallRuns(room),
    solidCells,
    surfaces,
    entrance: resolveEntrance(room),
    exit: resolveExit(room),
  }
}
