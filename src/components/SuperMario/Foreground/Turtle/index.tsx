import { FC, useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export type TurtleProps = {
  x: number
  y: number
  offset: number
}

type VariantProps = {
  [variant: number]: {
    src: string
  }
}

const Turtle: FC<TurtleProps> = ({ x, y, offset }: TurtleProps) => {
  const variants: VariantProps = {
    1: {
      src: '/images/turtle/turtle.1.png',
    },
    2: {
      src: '/images/turtle/turtle.2.png',
    },
  }

  const [state, setState] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setState(state === 1 ? 2 : 1), 450)
    return () => {
      clearTimeout(timer)
    }
  }, [state])

  return (
    <Box
      as={motion.div}
      zIndex={2}
      position={'absolute'}
      bottom={y + 'px'}
      left={x + 'px'}
      w={'80px'}
      h={'160px'}
      initial={{ translateX: '-' + offset + 'px', scaleX: 1 }}
      animate={{
        translateX: ['-' + offset + 'px', '0px', '0px', '-' + offset + 'px'],
        scaleX: [-1, -1, 1, 1],
        transition: {
          type: 'keyframes',
          times: [0, 0.5, 0.501, 1],
          delay: 0,
          duration: (offset / 50) * 2,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        },
      }}>
      <NextImage alt={'turtle'} src={variants[state].src} width={80} height={160} priority />
    </Box>
  )
}

export default Turtle
