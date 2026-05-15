'use client'

import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

export type FireProps = {
  x: number
  y: number
  forwards: boolean
}

const fireAnimation = keyframes`
  0% { content: url('/images/fire/fire.1.png'); }
  25% { content: url('/images/fire/fire.2.png'); }
  50% { content: url('/images/fire/fire.3.png'); }
  75% { content: url('/images/fire/fire.4.png'); }
  100% { content: url('/images/fire/fire.1.png'); }
`

const Fire = ({ x, y, forwards }: FireProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={3}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={30}
      h={34}
      initial={{ opacity: 0, translateX: '0px', translateY: '0px' }}
      animate={
        forwards && {
          opacity: [0, 1, 1, 0],
          translateX: ['0px', '0px', '-2400px', '-2400px'],
          translateY: ['0px', '0px', '600px', '600px'],
          transition: {
            type: 'keyframes',
            times: [0, 0.02, 0.98, 1],
            delay: 3.4,
            duration: 4.5,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 3.6,
          },
        }
      }
      sx={{
        '& img': {
          animation: `${fireAnimation} 0.5s steps(1) infinite`,
        },
      }}
    >
      <NextImage
        alt={'fire'}
        src={'/images/fire/fire.1.png'}
        width={30}
        height={34}
        draggable={false}
        priority
      />
    </Box>
  )
}

export default Fire
