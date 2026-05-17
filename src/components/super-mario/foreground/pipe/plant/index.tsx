'use client'

import type { MouseEventHandler } from 'react'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

export type PlantProps = {
  variant: 1 | 2
  forwards: boolean
  x: number
  y: number
  defeated?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
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

const plantTravel = keyframes`
  0%, 5% { transform: translateY(160px); }
  30%, 60% { transform: translateY(0); }
  95%, 100% { transform: translateY(160px); }
`

const plantDefeat = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  45% {
    opacity: 1;
    transform: translateY(64px);
  }
  100% {
    opacity: 0;
    transform: translateY(96px);
  }
`

const Plant = ({ variant, forwards, x, y, defeated = false, onClick }: PlantProps) => {
  return (
    <Box
      zIndex={-1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={80}
      h={160}
      cursor={defeated ? 'default' : 'pointer'}
      onClick={defeated ? undefined : onClick}
      sx={{
        animation: defeated
          ? `${plantDefeat} 0.42s ease-in forwards`
          : `${plantTravel} 8s linear infinite`,
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
        transform={forwards ? 'scaleX(-1)' : 'scaleX(1)'}
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
