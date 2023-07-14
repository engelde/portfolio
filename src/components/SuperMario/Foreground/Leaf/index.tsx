import type { FC } from 'react'
import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAudio } from '@/hooks/useAudio'
import Points from '../Points'

export type LeafProps = {
  x: number
  y: number
  active: boolean
  setActive: (status: boolean) => void
  mario: 1 | 2 | 3
  setMario: (variant: 1 | 2 | 3) => void
  score: number
  setScore: (score: number) => void
}

const Leaf: FC<LeafProps> = ({
  x,
  y,
  active,
  mario,
  score,
  setActive,
  setMario,
  setScore,
}: LeafProps) => {
  const { playAudio } = useAudio()
  const [running, setRunning] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const value = 1000

  useEffect(() => {
    if (active && !running) {
      setRunning(true)
      setScore(score + value)
      playAudio('leaf')

      if (mario < 3) {
        setMario(3)
      }

      setTimeout(() => {
        setDisabled(true)
      }, 150)
    }
  }, [active, mario, playAudio, running, score, setMario, setScore])

  return (
    <>
      {active && <Points x={x} y={260} total={value} />}
      {!disabled && (
        <Box
          as={motion.div}
          zIndex={-1}
          position={'absolute'}
          left={x + 'px'}
          bottom={y + 80 + 'px'}
          w={'80px'}
          h={'160px'}
          p={0}
          cursor={'pointer'}
          opacity={active ? 0 : 1}
          transition={'opacity .1s ease-out'}
          _hover={{ cursor: 'pointer', filter: 'brightness(110%)' }}
          onClick={() => !running && setActive(true)}
          initial={{ translateY: 0 }}
          animate={{
            translateY: [0, -160],
            transition: {
              type: 'keyframes',
              times: [0, 1],
              delay: 0,
              duration: 0.4,
              ease: 'easeInOut',
            },
          }}>
          <NextImage alt={'leaf'} src={'/images/leaf/leaf.png'} width={80} height={80} priority />
        </Box>
      )}
    </>
  )
}

export default Leaf
