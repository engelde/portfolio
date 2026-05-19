'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import NextImage from 'next/image'
import { Box, VStack } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'
import Fire from './fire'
import Plant from './plant'

const MemoizedFire = React.memo(Fire)
const MemoizedPlant = React.memo(Plant)

type FireShot = {
  flightX: number
  flightY: number
  angle: number
  id: number
}

type PlantState = 'alive' | 'hit' | 'gone'
type PipeDirection = 'up' | 'down'
type PipePlacement = 'bottom' | 'top'
type PipeSkin = 'normal' | 'alt'

const pipeEnter = keyframes`
  0% { transform: translateY(150%); }
  100% { transform: translateY(0); }
`

const plantHitboxTravel = keyframes`
  0%, 5% { transform: translateY(160px); }
  30%, 60% { transform: translateY(0); }
  95%, 100% { transform: translateY(160px); }
`

const plantCycleSeconds = 8
const firePeakWindowStart = 0.41
const firePeakWindowEnd = 0.49
const maxFireAngle = 55

export type PipeProps = {
  animateEntry?: boolean
  animationsPaused?: boolean
  direction?: PipeDirection
  xPos?: number
  yPos?: number
  x: number
  y: number
  height: number
  placement?: PipePlacement
  rotate?: number
  skin?: PipeSkin
  plant?: boolean
  plantVariant?: 1 | 2
  active?: boolean
  falling?: boolean
  setScore?: Dispatch<SetStateAction<number>>
  onStomp?: () => void
  zIndex?: number
}

const getPlantCycleProgress = (startedAt: number) =>
  (((Date.now() - startedAt) / 1000) % plantCycleSeconds) / plantCycleSeconds

const getPlantTranslateYForProgress = (progress: number) => {
  if (progress < 0.05) return 160
  if (progress < 0.3) return 160 - ((progress - 0.05) / 0.25) * 160
  if (progress < 0.6) return 0
  if (progress < 0.95) return ((progress - 0.6) / 0.35) * 160
  return 160
}

const getPlantTranslateY = (startedAt: number) =>
  getPlantTranslateYForProgress(getPlantCycleProgress(startedAt))

const Pipe = ({
  animateEntry = true,
  animationsPaused = false,
  direction = 'up',
  xPos,
  yPos,
  x,
  y,
  height,
  placement = 'bottom',
  rotate,
  skin = 'normal',
  plant,
  plantVariant,
  active,
  falling,
  setScore,
  onStomp,
  zIndex = 1,
}: PipeProps) => {
  const { playAudio } = useAudio()
  const [fireShot, setFireShot] = useState<FireShot | null>(null)
  const [plantState, setPlantState] = useState<PlantState>('alive')
  const cooldownUntilRef = useRef(0)
  const plantStartedAtRef = useRef(Date.now())
  const pausedAtRef = useRef<{ date: number; performance: number } | null>(null)
  const previousYRef = useRef(yPos)
  const plantHitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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
  const plantValue = 100
  const plantForwards = xPos !== undefined ? xPos >= x + 80 : false
  const pipeTopSrc = skin === 'alt' ? '/images/pipe/pipe.alt.0.png' : '/images/pipe/pipe.0.png'
  const pipeBodySrc = skin === 'alt' ? '/images/pipe/pipe.alt.1.png' : '/images/pipe/pipe.1.png'
  const pipeBodyHeight = Math.max(0, height - 80)
  const pipePlacement = placement === 'top' ? { top: y + 'px' } : { bottom: y + 'px' }
  const pipeTop = (
    <NextImage
      key={'top'}
      alt={'pipe'}
      src={pipeTopSrc}
      width={160}
      height={80}
      draggable={false}
      unoptimized
      style={{
        display: 'block',
        width: 160,
        height: 80,
        imageRendering: 'pixelated',
      }}
    />
  )
  const pipeBody = (
    <Box
      key={'body'}
      w={'160px'}
      h={pipeBodyHeight + 'px'}
      bg={`url(${pipeBodySrc}) repeat-y left top / 160px 80px`}
      sx={{ imageRendering: 'pixelated' }}
    />
  )
  const pipeParts = direction === 'down' ? [pipeBody, pipeTop] : [pipeTop, pipeBody]
  const finishFireShot = useCallback(() => {
    cooldownUntilRef.current = performance.now() + 1800
    setFireShot(null)
  }, [])

  const defeatPlant = useCallback(
    (stompMario: boolean) => {
      if (plantState !== 'alive') return

      setPlantState('hit')
      setFireShot(null)
      setScore?.((current) => current + plantValue)
      if (stompMario) onStomp?.()
      playAudio('stomp')
      if (plantHitTimeoutRef.current) clearTimeout(plantHitTimeoutRef.current)
      plantHitTimeoutRef.current = setTimeout(() => setPlantState('gone'), 820)
    },
    [onStomp, plantState, playAudio, setScore]
  )

  const handlePlantClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
      if (getPlantTranslateY(plantStartedAtRef.current) > 128) return

      defeatPlant(false)
    },
    [defeatPlant]
  )

  const launchFireShot = useCallback(() => {
    if (
      plantVariant !== 2 ||
      active !== true ||
      plantState !== 'alive' ||
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

    const plantProgress = getPlantCycleProgress(plantStartedAtRef.current)
    const plantInPeakLaunchWindow =
      plantProgress >= firePeakWindowStart && plantProgress <= firePeakWindowEnd
    if (!plantInPeakLaunchWindow) return

    const plantTopY = y + height + 160
    const angleFromPlantTop =
      (Math.atan2(Math.abs(plantTopY - marioY), Math.abs(marioX - fireOriginX)) * 180) / Math.PI
    if (angleFromPlantTop > maxFireAngle) return

    const targetUnitX = targetX / targetDistance
    const targetUnitY = targetY / targetDistance

    setFireShot({
      flightX: targetUnitX * fireTravel,
      flightY: targetUnitY * fireTravel,
      angle: (Math.atan2(targetY, targetX) * 180) / Math.PI,
      id: Date.now(),
    })
    playAudio('fire')
  }, [
    active,
    fireOriginX,
    fireShot,
    height,
    marioX,
    marioY,
    plantState,
    plantVariant,
    playAudio,
    targetDistance,
    targetX,
    targetY,
    xPos,
    y,
    yPos,
  ])

  useEffect(() => {
    return () => {
      if (plantHitTimeoutRef.current) clearTimeout(plantHitTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (animationsPaused && pausedAtRef.current === null) {
      pausedAtRef.current = { date: Date.now(), performance: performance.now() }
      return
    }

    if (!animationsPaused && pausedAtRef.current !== null) {
      const dateDelta = Date.now() - pausedAtRef.current.date
      const performanceDelta = performance.now() - pausedAtRef.current.performance

      plantStartedAtRef.current += dateDelta
      cooldownUntilRef.current += performanceDelta
      pausedAtRef.current = null
    }
  }, [animationsPaused])

  useEffect(() => {
    if (animationsPaused) return

    const fireCheck = window.setInterval(launchFireShot, 80)
    launchFireShot()

    return () => window.clearInterval(fireCheck)
  }, [animationsPaused, launchFireShot])

  useEffect(() => {
    if (animationsPaused || !plant || xPos === undefined || yPos === undefined) return

    const previousY = previousYRef.current ?? yPos
    previousYRef.current = yPos

    if (plantState !== 'alive') return

    const translateY = getPlantTranslateY(plantStartedAtRef.current)
    if (translateY > 128) return

    const exposedTop = y + height + 160 - translateY
    const marioCenterX = xPos + 40
    const plantCenterX = x + 80
    const horizontalHit = Math.abs(marioCenterX - plantCenterX) < 64
    const verticalHit = previousY >= exposedTop - 28 && yPos <= exposedTop + 40
    const descendingHit = falling === true && yPos <= previousY
    const abovePipe = yPos > y + height + 24

    if (horizontalHit && verticalHit && descendingHit && abovePipe) {
      defeatPlant(true)
    }
  }, [animationsPaused, defeatPlant, falling, height, plant, plantState, x, xPos, y, yPos])

  return (
    <Box
      zIndex={zIndex}
      position={'absolute'}
      left={x + 'px'}
      w={'160px'}
      {...pipePlacement}
      sx={{
        animation: animateEntry ? `${pipeEnter} 0.3s linear 0.3s both` : undefined,
      }}
    >
      <VStack
        spacing={0}
        mb={rotate !== undefined ? '-' + (height / 2 - 76) + 'px' : '0px'}
        transform={'rotate(' + ((rotate !== undefined && rotate + 'deg') || '0deg') + ')'}
      >
        {pipeParts}
      </VStack>
      {plant && (
        <>
          {plantState === 'hit' && <Points x={40} y={height + 80} total={plantValue} />}
          {plantVariant === 2 && active && plantState === 'alive' && fireShot && (
            <MemoizedFire
              x={fireX}
              y={fireY}
              flightX={fireShot.flightX}
              flightY={fireShot.flightY}
              angle={fireShot.angle}
              shotKey={fireShot.id}
              onComplete={finishFireShot}
            />
          )}
          {plantState !== 'gone' && (
            <MemoizedPlant
              x={40}
              y={height}
              variant={plantVariant !== undefined ? plantVariant : 1}
              forwards={plantForwards}
              defeated={plantState === 'hit'}
              onClick={handlePlantClick}
            />
          )}
          {plantState === 'alive' && (
            <Box
              aria-hidden={'true'}
              zIndex={2}
              position={'absolute'}
              left={'40px'}
              bottom={height + 'px'}
              w={'80px'}
              h={'160px'}
              cursor={'pointer'}
              onClick={handlePlantClick}
              sx={{
                animation: `${plantHitboxTravel} ${plantCycleSeconds}s linear infinite`,
              }}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default Pipe
