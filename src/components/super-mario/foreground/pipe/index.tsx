'use client'

import React from 'react'
import NextImage from 'next/image'
import { Box, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import Fire from './fire'
import Plant from './plant'

const MemoizedFire = React.memo(Fire)
const MemoizedPlant = React.memo(Plant)

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
  const fireX = 40
  const fireY = height + 80
  const fireOriginX = x + fireX + 15
  const fireOriginY = y + fireY + 17
  const marioX = xPos !== undefined ? xPos + 40 : fireOriginX - 1
  const marioY = yPos !== undefined ? yPos + 80 : fireOriginY
  const targetX = marioX - fireOriginX
  const targetY = fireOriginY - marioY
  const targetDistance = Math.hypot(targetX, targetY)
  const fireRange = 1500
  const fireTravel = 1800
  const verticalAim =
    targetY > 240 ? 0.45 : targetY > 80 ? 0.25 : targetY < -240 ? -0.45 : targetY < -80 ? -0.25 : 0
  const firing =
    plantVariant === 2 &&
    active === true &&
    xPos !== undefined &&
    yPos !== undefined &&
    targetDistance > 0 &&
    targetDistance <= fireRange
  const flightX = firing ? (targetX < 0 ? -fireTravel : fireTravel) : 0
  const flightY = firing ? verticalAim * fireTravel : 0
  const plantForwards = xPos !== undefined ? xPos < x + 80 : true

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
          <MemoizedPlant
            x={40}
            y={height}
            variant={plantVariant !== undefined ? plantVariant : 1}
            forwards={plantForwards}
          />
          {plantVariant === 2 && active && (
            <MemoizedFire x={fireX} y={fireY} firing={firing} flightX={flightX} flightY={flightY} />
          )}
        </>
      )}
    </Box>
  )
}

export default Pipe
