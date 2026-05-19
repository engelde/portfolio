import { Box } from '@chakra-ui/react'

import type { Rect } from '../types'

type WallRunProps = Rect & {
  image: string
  tileSize: number
}

const WallRun = ({ image, tileSize, x, y, width, height }: WallRunProps) => (
  <Box
    aria-hidden={'true'}
    position={'absolute'}
    left={x + 'px'}
    top={y + 'px'}
    w={width + 'px'}
    h={height + 'px'}
    bgImage={`url("${image}")`}
    bgRepeat={'repeat'}
    bgSize={`${tileSize}px ${tileSize}px`}
    sx={{ imageRendering: 'pixelated' }}
  />
)

export default WallRun
