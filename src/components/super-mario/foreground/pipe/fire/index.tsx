'use client'

import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

export type FireProps = {
  x: number
  y: number
  direction: 'left' | 'right'
  flightX: number
  shotKey: number
  onComplete: () => void
}

const fireAnimation = keyframes`
  0% { background-position: 0 0; }
  25% { background-position: -30px 0; }
  50% { background-position: -60px 0; }
  75% { background-position: -90px 0; }
  100% { background-position: 0 0; }
`

const Fire = ({ x, y, direction, flightX, shotKey, onComplete }: FireProps) => {
  return (
    <Box
      as={motion.div}
      key={shotKey}
      zIndex={-2}
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
      animate={{
        opacity: [0, 1, 1, 0],
        translateX: ['0px', '0px', `${flightX}px`, `${flightX}px`],
        transition: {
          type: 'keyframes',
          times: [0, 0.06, 0.94, 1],
          duration: 1.8,
          ease: 'linear',
        },
      }}
      transform={direction === 'left' ? 'scaleX(-1)' : undefined}
      onAnimationComplete={onComplete}
      sx={{
        animation: `${fireAnimation} 0.5s steps(1) infinite`,
        imageRendering: 'pixelated',
      }}
    />
  )
}

export default Fire
