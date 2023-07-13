import type { FC } from 'react'
import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

export type BrickProps = {
  x: number
  y: number
}

type VariantProps = {
  [variant: number]: {
    src: string
  }
}

const Brick: FC<BrickProps> = ({ x, y }: BrickProps) => {
  const variants: VariantProps = {
    1: {
      src: '/images/brick/brick.1.png',
    },
    2: {
      src: '/images/brick/brick.2.png',
    },
    3: {
      src: '/images/brick/brick.3.png',
    },
    4: {
      src: '/images/brick/brick.4.png',
    },
  }

  const [state, setState] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setState(state < 4 ? state + 1 : 1), 260)
    return () => {
      clearTimeout(timer)
    }
  }, [state])

  return (
    <Box zIndex={1} position={'absolute'} left={x + 'px'} bottom={y + 'px'} w={'80px'} h={'80px'}>
      <NextImage alt={'brick'} src={variants[state]?.src || ''} width={80} height={80} priority />
    </Box>
  )
}

export default Brick
