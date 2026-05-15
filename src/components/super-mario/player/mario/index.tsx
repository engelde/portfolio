'use client'

import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

export type MarioProps = {
  variant: 1 | 2 | 3
  x: number
  y: number
  xPos: number
  forwards: boolean
  jump: boolean
}

type VariantProps = {
  [variant: string]: {
    [state: number]: {
      src: string
      width: number
      height: number
    }
  }
}

const Mario = ({ variant, x, y, xPos, forwards, jump }: MarioProps) => {
  const variants: VariantProps = {
    1: {
      1: { src: '/images/mario/mario.regular.1.png', width: 100, height: 100 },
      2: { src: '/images/mario/mario.regular.2.png', width: 100, height: 100 },
    },
    2: {
      1: { src: '/images/mario/mario.super.1.png', width: 80, height: 160 },
      2: { src: '/images/mario/mario.super.2.png', width: 80, height: 160 },
    },
    3: {
      1: { src: '/images/mario/mario.raccoon.1.png', width: 120, height: 160 },
      2: { src: '/images/mario/mario.raccoon.2.png', width: 120, height: 160 },
    },
  }

  const jumpVariants: VariantProps = {
    1: { 1: { src: '/images/mario/mario.regular.jump.png', width: 100, height: 100 } },
    2: { 1: { src: '/images/mario/mario.super.jump.png', width: 80, height: 160 } },
    3: { 1: { src: '/images/mario/mario.raccoon.jump.png', width: 120, height: 160 } },
  }

  // Derive animation state mathematically from xPos
  const walkScale = 80 // Pixels per walk cycle
  const state = Math.floor(Math.abs(xPos) / walkScale) % 2 === 0 ? 1 : 2

  return (
    <Box
      zIndex={9}
      position={'fixed'}
      left={
        x +
        (forwards && variant !== 1
          ? 80 -
            ((jump ? jumpVariants[variant]?.[1]?.width : variants[variant]?.[state]?.width) || 0)
          : 0) +
        'px'
      }
      bottom={y + 'px'}
      w={
        ((jump ? jumpVariants[variant]?.[1]?.width : variants[variant]?.[state]?.width) || 0) + 'px'
      }
      h={
        ((jump ? jumpVariants[variant]?.[1]?.height : variants[variant]?.[state]?.height) || 0) +
        'px'
      }
      transform={!forwards ? 'scaleX(-1)' : ''}
    >
      <NextImage
        alt={'mario'}
        src={(jump ? jumpVariants[variant]?.[1]?.src : variants[variant]?.[state]?.src) || ''}
        width={(jump ? jumpVariants[variant]?.[1]?.width : variants[variant]?.[state]?.width) || 0}
        height={
          (jump ? jumpVariants[variant]?.[1]?.height : variants[variant]?.[state]?.height) || 0
        }
        draggable={false}
        priority
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width:
            (jump ? jumpVariants[variant]?.[1]?.width : variants[variant]?.[state]?.width) || 0,
          height:
            (jump ? jumpVariants[variant]?.[1]?.height : variants[variant]?.[state]?.height) || 0,
        }}
      />
    </Box>
  )
}

export default Mario
