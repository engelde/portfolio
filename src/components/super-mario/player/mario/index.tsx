'use client'

import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { motion, useAnimationControls } from 'framer-motion'

import type { PlayerCharacter } from '@/lib/store'

export type MarioProps = {
  character: PlayerCharacter
  down: boolean
  dying: boolean
  enteringPipe?: boolean
  exitingPipe?: boolean
  variant: 1 | 2 | 3
  x: number
  y: number
  xPos: number
  forwards: boolean
  jump: boolean
  zIndex?: number
}

type VariantProps = {
  name: 'regular' | 'super' | 'raccoon'
  width: number
  height: number
  frames: number
}

const Mario = ({
  character,
  down,
  dying,
  enteringPipe = false,
  exitingPipe = false,
  variant,
  x,
  y,
  xPos,
  forwards,
  jump,
  zIndex = 9,
}: MarioProps) => {
  const variants = {
    1: { name: 'regular', width: 100, height: 100, frames: 3 },
    2: { name: 'super', width: 80, height: 160, frames: 4 },
    3: { name: 'raccoon', width: 120, height: 160, frames: 4 },
  } satisfies Record<MarioProps['variant'], VariantProps>

  // Derive animation state mathematically from xPos
  const walkScale = 240 // Pixels per walk cycle
  const state = Math.floor(Math.abs(xPos) / walkScale) % 2 === 0 ? 1 : 2
  const currentVariant = variants[variant]
  const crouch = down && variant !== 1 && !jump && !dying && !enteringPipe && !exitingPipe
  const frame = crouch ? 3 : jump || dying ? 2 : state - 1
  const pulseControls = useAnimationControls()
  const marioInitial = exitingPipe ? { translateY: 192 } : false
  const marioAnimation = dying
    ? {
        opacity: [1, 1, 0],
        rotate: [0, 0, 26],
        translateY: [0, -150, 520],
        transition: { duration: 1.05, ease: 'easeInOut', times: [0, 0.28, 1] },
      }
    : enteringPipe
      ? {
          opacity: [1, 1, 0],
          translateY: [0, 96, 192],
          transition: { duration: 0.62, ease: 'easeIn', times: [0, 0.66, 1] },
        }
      : exitingPipe
        ? {
            opacity: 1,
            translateY: [192, 96, 0],
            transition: { duration: 0.68, ease: 'easeOut', times: [0, 0.28, 1] },
          }
        : pulseControls

  // Brief pulsate on variant change
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
        initial={marioInitial}
        animate={marioAnimation}
        style={{
          transformOrigin: 'bottom center',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Box
          aria-label={character}
          role={'img'}
          position={'absolute'}
          right={0}
          bottom={0}
          w={currentVariant.width + 'px'}
          h={currentVariant.height + 'px'}
          bgImage={`url("/images/${character}/${character}.${currentVariant.name}.sprite.png")`}
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
