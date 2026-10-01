'use client'

import { Box } from '@chakra-ui/react'

export type BrickProps = {
  id?: string
  x: number
  y: number
}

const animation = 'sm-brick-animation'

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
