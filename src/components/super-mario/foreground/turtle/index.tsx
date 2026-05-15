'use client'

import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

export type TurtleProps = {
  relative?: boolean
  x: number
  y: number
  offset: number
}

const walkAnimation = keyframes`
  0% { content: url('/images/turtle/turtle.1.png'); }
  50% { content: url('/images/turtle/turtle.2.png'); }
  100% { content: url('/images/turtle/turtle.1.png'); }
`

const Turtle = ({ relative, x, y, offset }: TurtleProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={2}
      position={relative ? 'relative' : 'absolute'}
      bottom={y + 'px'}
      left={x + 'px'}
      w={'80px'}
      h={'160px'}
      initial={{ translateX: '-' + offset + 'px', scaleX: 1 }}
      animate={{
        translateX: ['-' + offset + 'px', '0px', '0px', '-' + offset + 'px'],
        scaleX: [-1, -1, 1, 1],
        transition: {
          type: 'keyframes',
          times: [0, 0.5, 0.501, 1],
          delay: 0,
          duration: (offset / 50) * 2,
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
        h="160px"
        sx={{
          '& img': {
            animation: `${walkAnimation} 0.9s steps(1) infinite`,
          },
        }}
      >
        <NextImage
          alt={'turtle'}
          src={'/images/turtle/turtle.1.png'}
          width={80}
          height={160}
          draggable={false}
          priority
        />
      </Box>
    </Box>
  )
}

export default Turtle
