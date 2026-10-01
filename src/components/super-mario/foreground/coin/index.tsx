'use client'

import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

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

const coinSpin = 'sm-coin-spin'

const coinCollect = 'sm-coin-collect'

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
  }, [active, disabled, playAudio, setScore, running])

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
