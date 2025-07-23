'use client'

import { useAudio } from '@/hooks/useAudio'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'

export type PrizeBoxProps = {
  x: number
  y: number
  status: boolean
  setStatus: (status: boolean) => void
  active: boolean
  setActive: (active: boolean) => void
  prizeActive: boolean
  setPrizeActive: (active: boolean) => void
  prizeCount: number
  setPrizeCount: (count: number) => void
  children: ReactNode
}

type VariantProps = {
  [variant: number]: {
    src: string
  }
}

const PrizeBox: FC<PrizeBoxProps> = ({
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
  children,
}: PrizeBoxProps) => {
  const variants: VariantProps = {
    0: {
      src: '/images/box/box.0.png',
    },
    1: {
      src: '/images/box/box.1.png',
    },
    2: {
      src: '/images/box/box.2.png',
    },
    3: {
      src: '/images/box/box.3.png',
    },
    4: {
      src: '/images/box/box.4.png',
    },
  }

  const { playAudio } = useAudio()
  const [state, setState] = useState(1)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setState(state < 4 ? state + 1 : 1), 130)
      return () => {
        clearTimeout(timer)
      }
    } else {
      return
    }
  }, [status, state])

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
      as={motion.div}
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      initial={{ translateY: '150%' }}
      animate={{ translateY: 0, transition: { delay: 0.3, ease: 'linear' } }}
    >
      <Box
        position={'absolute'}
        left={0}
        bottom={'-80px'}
        mb={prizeActive ? '80px' : 0}
        transitionDelay={prizeActive ? '0.2s' : '0s'}
        transition={prizeActive ? 'all 0.4s ease-in-out' : 'margin-bottom 2s ease-in-out'}
      >
        {prizeActive && [children]}
      </Box>
      <Box
        w={'80px'}
        h={'80px'}
        mb={active ? '20px' : 0}
        transition={active ? 'margin-bottom 0.16s ease-in-out' : 'none'}
        cursor={status ? 'pointer' : 'default'}
        _hover={{ filter: status ? 'brightness(115%)' : 'brightness(100%)' }}
        onClick={handleAction}
      >
        <NextImage
          alt={'box'}
          src={(status ? variants[state]?.src : variants[0]?.src) || ''}
          width={80}
          height={80}
          draggable={false}
          priority
        />
      </Box>
    </Box>
  )
}

export default PrizeBox
