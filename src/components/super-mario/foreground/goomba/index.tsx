'use client'

import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export type GoombaProps = {
  x: number
  y: number
  offset: number
}

type VariantProps = {
  [variant: number]: {
    src: string
  }
}

const Goomba = ({ x, y, offset }: GoombaProps) => {
  const variants: VariantProps = {
    1: {
      src: '/images/goomba/goomba.1.png',
    },
    2: {
      src: '/images/goomba/goomba.2.png',
    },
  }

  const [state, setState] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setState(state === 1 ? 2 : 1), 400)
    return () => {
      clearTimeout(timer)
    }
  }, [state])

  return (
    <Box
      as={motion.div}
      zIndex={2}
      position={'absolute'}
      bottom={y + 'px'}
      left={x + 'px'}
      w={'80px'}
      h={'80px'}
      initial={{ translateX: '-' + offset + 'px' }}
      animate={{
        translateX: ['-' + offset + 'px', '0px', '-' + offset + 'px'],
        transition: {
          type: 'keyframes',
          times: [0, 0.5, 1],
          delay: 0,
          duration: (offset / 90) * 2,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        },
      }}
    >
      <NextImage
        alt={'goomba'}
        src={variants[state]?.src || ''}
        width={80}
        height={80}
        draggable={false}
        priority
      />
    </Box>
  )
}

export default Goomba
