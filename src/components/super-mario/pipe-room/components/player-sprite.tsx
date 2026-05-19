import { Box } from '@chakra-ui/react'

import type { PlayerCharacter } from '@/lib/store'

import type { PlayerSprite, Position } from '../types'

type PipeRoomPlayerSpriteProps = {
  character: PlayerCharacter
  exiting: boolean
  frame: number
  playerTop: number
  position: Position
  sprite: PlayerSprite
  transform?: string
  transition?: string
}

const PipeRoomPlayerSprite = ({
  character,
  exiting,
  frame,
  playerTop,
  position,
  sprite,
  transform,
  transition,
}: PipeRoomPlayerSpriteProps) => (
  <Box
    position={'absolute'}
    left={position.x + 'px'}
    top={playerTop + 'px'}
    w={sprite.width + 'px'}
    h={sprite.height + 'px'}
    zIndex={exiting ? 2 : 3}
    transform={transform}
    transformOrigin={'center'}
    transition={transition}
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
)

export default PipeRoomPlayerSprite
