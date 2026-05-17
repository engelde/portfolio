'use client'

import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { motion, useAnimationControls } from 'framer-motion'

export type MarioProps = {
  down: boolean
  variant: 1 | 2 | 3
  x: number
  y: number
  xPos: number
  forwards: boolean
  jump: boolean
  zIndex?: number
}

type VariantProps = {
  sprite: string
  width: number
  height: number
  frames: number
}

const Mario = ({ down, variant, x, y, xPos, forwards, jump, zIndex = 9 }: MarioProps) => {
  const variants = {
    1: { sprite: '/images/mario/mario.regular.sprite.png', width: 100, height: 100, frames: 3 },
    2: { sprite: '/images/mario/mario.super.sprite.png', width: 80, height: 160, frames: 4 },
    3: { sprite: '/images/mario/mario.raccoon.sprite.png', width: 120, height: 160, frames: 4 },
  } satisfies Record<MarioProps['variant'], VariantProps>

  // Derive animation state mathematically from xPos
  const walkScale = 240 // Pixels per walk cycle
  const state = Math.floor(Math.abs(xPos) / walkScale) % 2 === 0 ? 1 : 2
  const currentVariant = variants[variant]
  const crouch = down && variant !== 1 && !jump
  const frame = crouch ? 3 : jump ? 2 : state - 1

  // Brief pulsate on variant change
  const pulseControls = useAnimationControls()
  const prevVariantRef = useRef(variant)
  useEffect(() => {
    if (prevVariantRef.current !== variant) {
      prevVariantRef.current = variant
      pulseControls.start({
        scale: [1, 1.18, 0.94, 1.08, 1],
        transition: {
          duration: 0.55,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        },
      })
    }
  }, [variant, pulseControls])

  return (
    <Box
      zIndex={zIndex}
      position={'fixed'}
      left={x + (forwards && variant !== 1 ? 80 - currentVariant.width : 0) + 'px'}
      bottom={y + 'px'}
      w={currentVariant.width + 'px'}
      h={currentVariant.height + 'px'}
      transform={!forwards ? 'scaleX(-1)' : ''}
    >
      <Box
        as={motion.div}
        animate={pulseControls}
        style={{
          transformOrigin: 'bottom center',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Box
          aria-label={'mario'}
          role={'img'}
          position={'absolute'}
          right={0}
          bottom={0}
          w={currentVariant.width + 'px'}
          h={currentVariant.height + 'px'}
          bgImage={`url("${currentVariant.sprite}")`}
          bgPosition={`-${frame * currentVariant.width}px 0`}
          bgRepeat={'no-repeat'}
          bgSize={`${currentVariant.width * currentVariant.frames}px ${currentVariant.height}px`}
          sx={{ imageRendering: 'pixelated' }}
        />
      </Box>
    </Box>
  )
}

export default Mario
