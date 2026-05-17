'use client'

import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

export type FireProps = {
  x: number
  y: number
  firing: boolean
  flightX: number
  flightY: number
}

const fireAnimation = keyframes`
  0% { background-position: 0 0; }
  25% { background-position: -30px 0; }
  50% { background-position: -60px 0; }
  75% { background-position: -90px 0; }
  100% { background-position: 0 0; }
`

const Fire = ({ x, y, firing, flightX, flightY }: FireProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={3}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      aria-label={'fire'}
      role={'img'}
      w={30}
      h={34}
      bgImage={'url("/images/fire/fire.sprite.png")'}
      bgPosition={'0 0'}
      bgRepeat={'no-repeat'}
      bgSize={'120px 34px'}
      initial={{ opacity: 0, translateX: '0px', translateY: '0px' }}
      animate={
        firing
          ? {
              opacity: [0, 1, 1, 0],
              translateX: ['0px', '0px', `${flightX}px`, `${flightX}px`],
              translateY: ['0px', '0px', `${flightY}px`, `${flightY}px`],
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
          : { opacity: 0, translateX: '0px', translateY: '0px' }
      }
      sx={{
        animation: `${fireAnimation} 0.5s steps(1) infinite`,
        imageRendering: 'pixelated',
      }}
    />
  )
}

export default Fire
