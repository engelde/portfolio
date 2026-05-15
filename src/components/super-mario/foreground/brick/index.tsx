'use client'

import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

export type BrickProps = {
  x: number
  y: number
}

const animation = keyframes`
  0% { content: url('/images/brick/brick.1.png'); }
  25% { content: url('/images/brick/brick.2.png'); }
  50% { content: url('/images/brick/brick.3.png'); }
  75% { content: url('/images/brick/brick.4.png'); }
  100% { content: url('/images/brick/brick.1.png'); }
`

const Brick = ({ x, y }: BrickProps) => {
  return (
    <Box zIndex={1} position={'absolute'} left={x + 'px'} bottom={y + 'px'} w={'80px'} h={'80px'}>
      <Box
        as="div"
        w="80px"
        h="80px"
        sx={{
          '& img': {
            animation: `${animation} 1s steps(1) infinite`,
          },
        }}
      >
        <NextImage
          alt={'brick'}
          src={'/images/brick/brick.1.png'}
          width={80}
          height={80}
          draggable={false}
          priority
        />
      </Box>
    </Box>
  )
}

export default Brick
