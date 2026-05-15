'use client'

import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

export type GoombaProps = {
  x: number
  y: number
  offset: number
}

const walkAnimation = keyframes`
  0% { content: url('/images/goomba/goomba.1.png'); }
  50% { content: url('/images/goomba/goomba.2.png'); }
  100% { content: url('/images/goomba/goomba.1.png'); }
`

const Goomba = ({ x, y, offset }: GoombaProps) => {
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
      <Box
        as="div"
        w="80px"
        h="80px"
        sx={{
          '& img': {
            animation: `${walkAnimation} 0.8s steps(1) infinite`,
          },
        }}
      >
        <NextImage
          alt={'goomba'}
          src={'/images/goomba/goomba.1.png'}
          width={80}
          height={80}
          draggable={false}
          priority
        />
      </Box>
    </Box>
  )
}

export default Goomba
