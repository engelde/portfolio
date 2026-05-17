'use client'

import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

export type PlantProps = {
  variant: 1 | 2
  forwards: boolean
  x: number
  y: number
}

const animation1 = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: -80px 0; }
  100% { background-position: 0 0; }
`

const animation2 = keyframes`
  0% { background-position: -160px 0; }
  16.6% { background-position: -240px 0; }
  33.3% { background-position: -320px 0; }
  50% { background-position: -400px 0; }
  66.6% { background-position: -320px 0; }
  83.3% { background-position: -240px 0; }
  100% { background-position: -160px 0; }
`

const Plant = ({ variant, forwards, x, y }: PlantProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={-1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={80}
      h={160}
      transform={'scaleX(-1)'}
      {...(!forwards && {
        transform: 'scaleX(-1)',
      })}
      initial={{ translateY: '160px' }}
      animate={{
        translateY: ['160px', '160px', '0px', '0px', '160px', '160px'],
        transition: {
          type: 'keyframes',
          times: [0, 0.05, 0.3, 0.6, 0.95, 1],
          delay: 0,
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        },
      }}
    >
      <Box
        aria-label={'plant'}
        role={'img'}
        w={'80px'}
        h={'160px'}
        bgImage={'url("/images/plant/plant.sprite.png")'}
        bgPosition={variant === 1 ? '0 0' : '-160px 0'}
        bgRepeat={'no-repeat'}
        bgSize={'480px 160px'}
        {...(!forwards && {
          transform: 'scaleX(-1)',
        })}
        sx={{
          animation:
            variant === 1
              ? `${animation1} 0.8s steps(1) infinite`
              : `${animation2} 2.4s steps(1) infinite`,
          imageRendering: 'pixelated',
        }}
      />
    </Box>
  )
}

export default Plant
