'use client'

import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'

export type MushroomProps = {
  x: number
  y: number
  active: boolean
  setActive: (status: boolean) => void
  mario: 1 | 2 | 3
  setMario: (variant: 1 | 2 | 3) => void
  score: number
  setScore: (score: number) => void
}

const Mushroom = ({ x, y, active, mario, score, setActive, setMario, setScore }: MushroomProps) => {
  const { playAudio } = useAudio()
  const [appearing, setAppearing] = useState(true)
  const [running, setRunning] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const value = 1000

  useEffect(() => {
    if (appearing) {
      playAudio('mushroom')
      setAppearing(false)
    }
  }, [appearing, playAudio])

  useEffect(() => {
    if (active && !running) {
      setRunning(true)
      setScore(score + value)
      playAudio('powerUp')

      if (mario < 2) {
        setMario(2)
      }

      setTimeout(() => {
        setDisabled(true)
      }, 150)
    }
  }, [active, mario, playAudio, running, score, setMario, setScore])

  return (
    <>
      {active && <Points x={x + 320} y={y - 40} total={value} />}
      {!disabled && (
        <Box
          as={motion.div}
          zIndex={-1}
          position={'absolute'}
          left={x + 'px'}
          bottom={y + 80 + 'px'}
          w={'80px'}
          h={'80px'}
          p={0}
          cursor={'pointer'}
          opacity={active ? 0 : 1}
          transition={'opacity .1s ease-out'}
          _hover={{ cursor: 'pointer', filter: 'brightness(110%)' }}
          onClick={() => !running && setActive(true)}
          initial={{ translateX: 0, translateY: 0 }}
          animate={{
            translateX: [0, 0, 320],
            translateY: [0, 0, 160],
            transition: {
              translateX: {
                type: 'tween',
                ease: 'linear',
                duration: 1.4,
                times: [0, 0.28, 1],
              },
              translateY: {
                type: 'tween',
                ease: [0.55, 0, 0.85, 0.4],
                duration: 1.4,
                times: [0, 0.28, 1],
              },
            },
          }}
        >
          <NextImage
            alt={'mushroom'}
            src={'/images/mushroom/mushroom.png'}
            width={80}
            height={80}
            draggable={false}
            priority
          />
        </Box>
      )}
    </>
  )
}

export default Mushroom
