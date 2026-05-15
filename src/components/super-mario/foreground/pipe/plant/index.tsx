'use client'

import NextImage from 'next/image'
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
  0% { content: url('/images/plant/plant.1.png'); }
  50% { content: url('/images/plant/plant.2.png'); }
  100% { content: url('/images/plant/plant.1.png'); }
`

const animation2 = keyframes`
  0% { content: url('/images/plant/plant.3.png'); }
  16.6% { content: url('/images/plant/plant.4.png'); }
  33.3% { content: url('/images/plant/plant.5.png'); }
  50% { content: url('/images/plant/plant.6.png'); }
  66.6% { content: url('/images/plant/plant.5.png'); }
  83.3% { content: url('/images/plant/plant.4.png'); }
  100% { content: url('/images/plant/plant.3.png'); }
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
      sx={{
        '& img': {
          animation:
            variant === 1
              ? `${animation1} 0.8s steps(1) infinite`
              : `${animation2} 2.4s steps(1) infinite`,
        },
      }}
    >
      <NextImage
        alt={'plant'}
        src={variant === 1 ? '/images/plant/plant.1.png' : '/images/plant/plant.3.png'}
        width={80}
        height={160}
        draggable={false}
        priority
        {...(!forwards && {
          style: {
            transform: 'scaleX(-1)',
          },
        })}
      />
    </Box>
  )
}

export default Plant
