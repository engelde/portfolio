'use client'

import type { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export type TreeProps = {
  variant: 1 | 2 | 3
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

const Tree: FC<TreeProps> = ({ variant, x, y }: TreeProps) => {
  const variants: VariantProps = {
    1: {
      src: '/images/tree/tree.1.png',
      width: 320,
      height: 244,
    },
    2: {
      src: '/images/tree/tree.2.png',
      width: 640,
      height: 320,
    },
    3: {
      src: '/images/tree/tree.3.png',
      width: 480,
      height: 640,
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
      animate={{ translateY: 0, transition: { delay: 0.3, ease: 'linear' } }}
    >
      <NextImage
        alt={'tree'}
        src={variants[variant]?.src || ''}
        width={variants[variant]?.width || 0}
        height={variants[variant]?.height || 0}
        draggable={false}
        priority
      />
    </Box>
  )
}

export default Tree
