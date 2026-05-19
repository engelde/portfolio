import type { PipeRoomConfig, PipeRoomId } from '../types'
import defaultRoom from './default.json'

const pipeRooms = {
  default: defaultRoom as PipeRoomConfig,
} satisfies Record<PipeRoomId, PipeRoomConfig>

export const getPipeRoomConfig = (id: PipeRoomId = 'default') => pipeRooms[id]
