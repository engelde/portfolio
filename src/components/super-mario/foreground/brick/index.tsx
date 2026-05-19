'use client'

import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

export type BrickProps = {
  id?: string
  x: number
  y: number
}

const animation = keyframes`
  0% { background-position: 0 0; }
  25% { background-position: -80px 0; }
  50% { background-position: -160px 0; }
  75% { background-position: -240px 0; }
  100% { background-position: 0 0; }
`

const Brick = ({ id, x, y }: BrickProps) => {
  return (
    <Box
      data-brick-id={id}
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={'80px'}
      h={'80px'}
    >
      <Box
        aria-label={'brick'}
        role={'img'}
        w={'80px'}
        h={'80px'}
        bgImage={'url("/images/brick/brick.sprite.png")'}
        bgPosition={'0 0'}
        bgRepeat={'no-repeat'}
        bgSize={'320px 80px'}
        sx={{
          animation: `${animation} 1s steps(1) infinite`,
          imageRendering: 'pixelated',
        }}
      />
    </Box>
  )
}

export default Brick
