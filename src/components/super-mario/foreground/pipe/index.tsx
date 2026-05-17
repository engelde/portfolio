'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import NextImage from 'next/image'
import { Box, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useAudio } from '@/hooks/useAudio'

import Fire from './fire'
import Plant from './plant'

const MemoizedFire = React.memo(Fire)
const MemoizedPlant = React.memo(Plant)

type FireShot = {
  direction: 'left' | 'right'
  id: number
}

export type PipeProps = {
  xPos?: number
  yPos?: number
  x: number
  y: number
  height: number
  rotate?: number
  plant?: boolean
  plantVariant?: 1 | 2
  active?: boolean
}

const Pipe = ({ xPos, yPos, x, y, height, rotate, plant, plantVariant, active }: PipeProps) => {
  const { playAudio } = useAudio()
  const [fireShot, setFireShot] = useState<FireShot | null>(null)
  const cooldownUntilRef = useRef(0)
  const fireX = 40
  const fireY = height + 80
  const fireOriginX = x + fireX + 15
  const fireOriginY = y + fireY + 17
  const marioX = xPos !== undefined ? xPos + 40 : fireOriginX - 1
  const marioY = yPos !== undefined ? yPos + 80 : fireOriginY
  const targetX = marioX - fireOriginX
  const targetY = fireOriginY - marioY
  const targetDistance = Math.hypot(targetX, targetY)
  const fireRange = 960
  const verticalRange = 260
  const fireTravel = 1280
  const plantForwards = xPos !== undefined ? xPos < x + 80 : true
  const finishFireShot = useCallback(() => {
    cooldownUntilRef.current = performance.now() + 1800
    setFireShot(null)
  }, [])

  useEffect(() => {
    if (
      plantVariant !== 2 ||
      active !== true ||
      fireShot ||
      xPos === undefined ||
      yPos === undefined ||
      targetDistance <= 0 ||
      targetDistance > fireRange ||
      Math.abs(targetY) > verticalRange ||
      performance.now() < cooldownUntilRef.current
    ) {
      return
    }

    setFireShot({
      direction: targetX < 0 ? 'left' : 'right',
      id: Date.now(),
    })
    playAudio('fire')
  }, [active, fireShot, playAudio, plantVariant, targetDistance, targetX, targetY, xPos, yPos])

  return (
    <Box
      as={motion.div}
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={'160px'}
      initial={{ translateY: '150%' }}
      animate={{ translateY: 0, transition: { delay: 0.3, ease: 'linear' } }}
    >
      <VStack
        spacing={0}
        mb={rotate !== undefined ? '-' + (height / 2 - 76) + 'px' : '0px'}
        transform={'rotate(' + ((rotate !== undefined && rotate + 'deg') || '0deg') + ')'}
      >
        <NextImage
          alt={'pipe'}
          src={'/images/pipe/pipe.0.png'}
          width={160}
          height={80}
          draggable={false}
          unoptimized
        />
        <Box
          w={'160px'}
          h={height - 80 + 'px'}
          bg={'url(/images/pipe/pipe.1.png) repeat-y left top / contain'}
        />
      </VStack>
      {plant && (
        <>
          {plantVariant === 2 && active && fireShot && (
            <MemoizedFire
              x={fireX}
              y={fireY}
              direction={fireShot.direction}
              flightX={fireShot.direction === 'left' ? -fireTravel : fireTravel}
              shotKey={fireShot.id}
              onComplete={finishFireShot}
            />
          )}
          <MemoizedPlant
            x={40}
            y={height}
            variant={plantVariant !== undefined ? plantVariant : 1}
            forwards={plantForwards}
          />
        </>
      )}
    </Box>
  )
}

export default Pipe
