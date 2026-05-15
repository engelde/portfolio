'use client'

import { useEffect, useState } from 'react'
import NextImage from 'next/image'
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
  0% { content: url('/images/coin/coin.1.png'); }
  20% { content: url('/images/coin/coin.2.png'); }
  40% { content: url('/images/coin/coin.3.png'); }
  60% { content: url('/images/coin/coin.4.png'); }
  80% { content: url('/images/coin/coin.5.png'); }
  100% { content: url('/images/coin/coin.1.png'); }
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
          sx={{
            '& img': {
              animation: `${coinSpin} 0.75s steps(1) infinite`,
            },
          }}
        >
          <NextImage
            alt={'coin'}
            src={'/images/coin/coin.1.png'}
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

export default Coin
