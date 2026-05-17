'use client'

import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'

export type CoinProps = {
  x: number
  y: number
  show?: boolean
  clickable?: boolean
  active: boolean
  setActive: (status: boolean) => void
  score: number
  setScore: (score: number) => void
}

const coinSpin = keyframes`
  0% { background-position: 0 0; }
  20% { background-position: -80px 0; }
  40% { background-position: -160px 0; }
  60% { background-position: -240px 0; }
  80% { background-position: -320px 0; }
  100% { background-position: 0 0; }
`

const Coin = ({ x, y, show, clickable, active, setActive, score, setScore }: CoinProps) => {
  const { playAudio } = useAudio()
  const [running, setRunning] = useState(show)
  const [disabled, setDisabled] = useState(false)
  const value = 100

  useEffect(() => {
    if (active && !disabled) {
      setDisabled(true)
      setScore(score + value)
      playAudio('coin')

      if (!running) {
        setRunning(true)
      }

      setTimeout(() => {
        setRunning(false)
      }, 600)
    }
  }, [active, disabled, playAudio, score, setActive, setScore, running, setDisabled, setRunning])

  return (
    <>
      {active && <Points x={x} y={y + 260} total={value} />}
      {running && (
        <Box
          as={motion.div}
          zIndex={-1}
          position={'absolute'}
          left={x + 'px'}
          bottom={y + 80 + 'px'}
          w={'72px'}
          h={'72px'}
          pl={'4px'}
          {...(clickable && !disabled && { cursor: 'pointer', onClick: () => setActive(true) })}
          _hover={{ filter: 'brightness(115%)' }}
          initial={{ opacity: 1, translateY: 0 }}
          animate={
            active && {
              opacity: [1, 1, 1, 1, 0],
              translateY: [0, -200, -200, 0, 0],
              transition: {
                type: 'keyframes',
                times: [0, 0.4, 0.6, 0.8, 1],
                delay: 0,
                duration: 0.6,
                ease: 'easeInOut',
              },
            }
          }
        >
          <Box
            aria-label={'coin'}
            role={'img'}
            w={'80px'}
            h={'80px'}
            bgImage={'url("/images/coin/coin.sprite.png")'}
            bgPosition={'0 0'}
            bgRepeat={'no-repeat'}
            bgSize={'400px 80px'}
            sx={{
              animation: `${coinSpin} 0.75s steps(1) infinite`,
              imageRendering: 'pixelated',
            }}
          />
        </Box>
      )}
    </>
  )
}

export default Coin
