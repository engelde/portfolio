import { FC, useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type Props = {
  variant: 1 | 2
  forwards: boolean
  x: number
  y: number
}

type VariantProps = {
  [variant: number]: {
    [state: number]: {
      src: string
    }
  }
}

const Plant: FC<Props> = ({ variant, forwards, x, y }: Props) => {
  const variants: VariantProps = {
    1: {
      1: {
        src: '/images/plant/plant.1.png',
      },
      2: {
        src: '/images/plant/plant.2.png',
      },
      3: {
        src: '/images/plant/plant.1.png',
      },
      4: {
        src: '/images/plant/plant.2.png',
      },
      5: {
        src: '/images/plant/plant.1.png',
      },
      6: {
        src: '/images/plant/plant.2.png',
      },
    },
    2: {
      1: {
        src: '/images/plant/plant.3.png',
      },
      2: {
        src: '/images/plant/plant.4.png',
      },
      3: {
        src: '/images/plant/plant.5.png',
      },
      4: {
        src: '/images/plant/plant.6.png',
      },
      5: {
        src: '/images/plant/plant.5.png',
      },
      6: {
        src: '/images/plant/plant.4.png',
      },
    },
  }

  const [state, setState] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setState(state < 6 ? state + 1 : 1), 400)
    return () => {
      clearTimeout(timer)
    }
  }, [state])

  return (
    <Box
      as={motion.div}
      zIndex={-1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={80}
      h={160}
      transform={'scaleX(-1)'}
      {...(!forwards && {
        transform: 'scaleX(-1)',
      })}
      initial={{ translateY: '160px' }}
      animate={{
        translateY: ['160px', '160px', '0px', '0px', '160px', '160px'],
        transition: {
          type: 'keyframes',
          times: [0, 0.05, 0.3, 0.6, 0.95, 1],
          delay: 0,
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        },
      }}>
      <NextImage
        alt={'plant'}
        src={variants[variant][state].src}
        width={80}
        height={160}
        priority
        {...(!forwards && {
          style: {
            transform: 'scaleX(-1)',
          },
        })}
      />
    </Box>
  )
}

export default Plant
