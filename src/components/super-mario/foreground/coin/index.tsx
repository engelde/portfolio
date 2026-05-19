'use client'

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import { useAudio } from '@/hooks/useAudio'

import Points from '../points'

export type CoinProps = {
  x: number
  y: number
  show?: boolean
  clickable?: boolean
  active: boolean
  animationsPaused?: boolean
  setActive: (status: boolean) => void
  score: number
  setScore: Dispatch<SetStateAction<number>>
}

const coinSpin = keyframes`
  0%, 19.99% { background-position: 0 0; }
  20%, 39.99% { background-position: -80px 0; }
  40%, 59.99% { background-position: -160px 0; }
  60%, 79.99% { background-position: -240px 0; }
  80%, 99.99% { background-position: -320px 0; }
  100% { background-position: 0 0; }
`

const coinCollect = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  40%, 60% {
    opacity: 1;
    transform: translateY(-200px);
  }
  80% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
`

const coinFrameSize = 80
const coinVisualScale = 0.8

const Coin = ({ x, y, show, clickable, active, setActive, setScore }: CoinProps) => {
  const { playAudio } = useAudio()
  const [running, setRunning] = useState(show)
  const [disabled, setDisabled] = useState(false)
  const value = 100

  useEffect(() => {
    if (active && !disabled) {
      setDisabled(true)
      setScore((current) => current + value)
      playAudio('coin')

      if (!running) {
        setRunning(true)
      }
    }
  }, [active, disabled, playAudio, setActive, setScore, running, setDisabled, setRunning])

  return (
    <>
      {active && <Points x={x} y={y + 260} total={value} />}
      {running && (
        <Box
          zIndex={-1}
          position={'absolute'}
          left={x + 'px'}
          bottom={y + 80 + 'px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          w={coinFrameSize + 'px'}
          h={coinFrameSize + 'px'}
          {...(clickable && !disabled && { cursor: 'pointer', onClick: () => setActive(true) })}
          _hover={{ filter: 'brightness(115%)' }}
          sx={{
            animation: active ? `${coinCollect} 0.6s ease-in-out forwards` : 'none',
          }}
          onAnimationEnd={(event) => {
            if (event.currentTarget !== event.target || !active) return
            setRunning(false)
          }}
        >
          <Box
            aria-label={'coin'}
            role={'img'}
            w={coinFrameSize + 'px'}
            h={coinFrameSize + 'px'}
            bgImage={'url("/images/coin/coin.sprite.png")'}
            bgPosition={'0 0'}
            bgRepeat={'no-repeat'}
            bgSize={`${coinFrameSize * 5}px ${coinFrameSize}px`}
            sx={{
              animation: `${coinSpin} 0.52s steps(1) infinite`,
              imageRendering: 'pixelated',
              transform: `scale(${coinVisualScale})`,
              transformOrigin: 'center',
            }}
          />
        </Box>
      )}
    </>
  )
}

export default Coin
