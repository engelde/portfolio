import { FC, useState, useEffect } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Points from '../Points'

export type MushroomProps = {
  x: number
  y: number
  active: boolean
  setActive: (status: boolean) => void
  mario: 1 | 2
  setMario: (variant: 1 | 2) => void
  score: number
  setScore: (score: number) => void
  audio: number
}

const Mushroom: FC<MushroomProps> = ({
  x,
  y,
  active,
  mario,
  score,
  audio,
  setActive,
  setMario,
  setScore,
}: MushroomProps) => {
  const [appearing, setAppearing] = useState(true)
  const [running, setRunning] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const value = 1000

  useEffect(() => {
    if (appearing) {
      if (audio > 0) {
        const sound = new Audio('/audio/mushroom/mushroom.mp3')
        sound.volume = audio / 100
        sound.play()
      }

      setAppearing(false)
    }
  }, [appearing, audio])

  useEffect(() => {
    if (active && !running) {
      setRunning(true)
      setScore(score + value)

      if (mario === 1) {
        setMario(2)
      }

      if (audio > 0) {
        const sound = new Audio('/audio/powerUp/powerUp.mp3')
        sound.volume = audio / 100
        sound.play()
      }

      setTimeout(() => {
        setDisabled(true)
      }, 150)
    }
  }, [active, mario, running, score, setMario, setScore, audio])

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
          _hover={{ cursor: 'pointer', filter: 'brightness(115%)' }}
          onClick={() => !running && setActive(true)}
          initial={{ translateX: 0, translateY: 0 }}
          animate={{
            translateX: [0, 0, 80, 160, 240, 320],
            translateY: [0, 0, 0, 80, 160, 160],
            transition: {
              type: 'keyframes',
              times: [0, 0.3, 1],
              delay: 0,
              duration: 1.4,
              ease: 'easeInOut',
            },
          }}>
          <NextImage
            alt={'mushroom'}
            src={'/images/mushroom/mushroom.png'}
            width={80}
            height={80}
            priority
          />
        </Box>
      )}
    </>
  )
}

export default Mushroom
