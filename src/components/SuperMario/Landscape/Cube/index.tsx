import type { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export type CubeProps = {
  variant: 1 | 2 | 3 | 4 | 5
  x: number
  y: number
}

type VariantProps = {
  [variant: number]: {
    src: string
    width: number
    height: number
  }
}

const Cube: FC<CubeProps> = ({ variant, x, y }: CubeProps) => {
  const variants: VariantProps = {
    1: {
      src: '/images/cube/cube.1.png',
      width: 441,
      height: 400,
    },
    2: {
      src: '/images/cube/cube.2.png',
      width: 1080,
      height: 560,
    },
    3: {
      src: '/images/cube/cube.3.png',
      width: 919,
      height: 480,
    },
    4: {
      src: '/images/cube/cube.4.png',
      width: 440,
      height: 720,
    },
    5: {
      src: '/images/cube/cube.5.png',
      width: 360,
      height: 200,
    },
  }

  return (
    <Box
      as={motion.div}
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={(variants[variant]?.width || 0) + 'px'}
      h={(variants[variant]?.height || 0) + 'px'}
      initial={{ translateY: '150%' }}
      animate={{ translateY: 0, transition: { delay: 0.3, ease: 'linear' } }}>
      <NextImage
        alt={'cube'}
        src={variants[variant]?.src || ''}
        width={variants[variant]?.width || 0}
        height={variants[variant]?.height || 0}
        priority
      />
    </Box>
  )
}

export default Cube
