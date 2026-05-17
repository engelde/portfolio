'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import { useAudio } from '@/hooks/useAudio'

export type PrizeBoxProps = {
  x: number
  y: number
  status: boolean
  setStatus: (status: boolean) => void
  active: boolean
  animationsPaused?: boolean
  setActive: (active: boolean) => void
  prizeActive: boolean
  setPrizeActive: (active: boolean) => void
  prizeCount: number
  setPrizeCount: (count: number) => void
  viewportActive?: boolean
  children: ReactNode
}

const boxAnimation = keyframes`
  0% { background-position: -80px 0; }
  25% { background-position: -160px 0; }
  50% { background-position: -240px 0; }
  75% { background-position: -320px 0; }
  100% { background-position: -80px 0; }
`

const boxEnter = keyframes`
  0% { transform: translateY(150%); }
  100% { transform: translateY(0); }
`

const PrizeBox = ({
  x,
  y,
  status,
  setStatus,
  active,
  setActive,
  prizeActive,
  setPrizeActive,
  prizeCount,
  setPrizeCount,
  viewportActive = true,
  children,
}: PrizeBoxProps) => {
  const { playAudio } = useAudio()
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (active && !running) {
      setRunning(true)

      if (prizeCount > 0) {
        setPrizeCount(prizeCount - 1)
      } else {
        playAudio('box')
      }

      setTimeout(() => {
        setActive(false)
      }, 200)

      setTimeout(() => {
        setRunning(false)
      }, 800)
    }

    if (status && prizeCount < 1) {
      setStatus(false)
    }
  }, [active, playAudio, prizeCount, setActive, setPrizeCount, setStatus, running, status])

  const handleAction = () => {
    setActive(true)

    if (status) {
      setPrizeActive(true)
    }
  }

  return (
    <Box
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      sx={{
        animation: `${boxEnter} 0.3s linear 0.3s both`,
      }}
    >
      <Box
        position={'absolute'}
        left={0}
        bottom={'-80px'}
        transform={prizeActive ? 'translate3d(0, -80px, 0)' : 'translate3d(0, 0, 0)'}
        transitionDelay={prizeActive ? '0.2s' : '0s'}
        transition={prizeActive ? 'transform 0.4s ease-in-out' : 'transform 2s ease-in-out'}
        willChange={'transform'}
      >
        {prizeActive && [children]}
      </Box>
      <Box
        role={'img'}
        aria-label={'box'}
        w={'80px'}
        h={'80px'}
        transform={active ? 'translate3d(0, -20px, 0)' : 'translate3d(0, 0, 0)'}
        transition={active ? 'transform 0.16s ease-in-out' : 'none'}
        willChange={'transform, background-position'}
        cursor={status ? 'pointer' : 'default'}
        bgImage={'url("/images/box/box.sprite.png")'}
        bgRepeat={'no-repeat'}
        bgSize={'400px 80px'}
        bgPosition={status ? '-80px 0' : '0 0'}
        _hover={{ filter: status ? 'brightness(115%)' : 'brightness(100%)' }}
        onClick={handleAction}
        sx={{
          animation: status && viewportActive ? `${boxAnimation} 0.52s steps(1) infinite` : 'none',
          imageRendering: 'pixelated',
        }}
      />
    </Box>
  )
}

export default PrizeBox
