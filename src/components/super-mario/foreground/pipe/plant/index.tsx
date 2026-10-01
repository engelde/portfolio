'use client'

import type { MouseEventHandler } from 'react'
import { Box } from '@chakra-ui/react'

export type PlantProps = {
  variant: 1 | 2
  forwards: boolean
  x: number
  y: number
  defeated?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

const animation1 = 'sm-plant-animation1'

const animation2 = 'sm-plant-animation2'

const plantTravel = 'sm-plant-travel'

const plantDefeat = 'sm-plant-defeat'

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
