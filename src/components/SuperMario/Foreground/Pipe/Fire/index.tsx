import { FC, useEffect, useState } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type Props = {
  x: number
  y: number
  forwards: boolean
}

type VariantProps = {
  [variant: number]: {
    src: string
  }
}

const Fire: FC<Props> = ({ x, y, forwards }: Props) => {
  const variants: VariantProps = {
    1: {
      src: '/images/fire/fire.1.png',
    },
    2: {
      src: '/images/fire/fire.2.png',
    },
    3: {
      src: '/images/fire/fire.3.png',
    },
    4: {
      src: '/images/fire/fire.4.png',
    },
    5: {
      src: '/images/fire/fire.3.png',
    },
    6: {
      src: '/images/fire/fire.2.png',
    },
  }

  const [state, setState] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setState(state < 6 ? state + 1 : 1), 250)
    return () => {
      clearTimeout(timer)
    }
  }, [state])

  return (
    <Box
      as={motion.div}
      zIndex={9}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={30}
      h={34}
      visibility={forwards ? 'visible' : 'hidden'}
      initial={{ opacity: 0, translateX: '0px', translateY: '0px' }}
      animate={{
        opacity: [0, 1, 1, 0],
        translateX: ['0px', '0px', '-2400px', '-2400px'],
        translateY: ['0px', '0px', '600px', '600px'],
        transition: {
          type: 'keyframes',
          times: [0, 0.02, 0.98, 1],
          delay: 3.4,
          duration: 4.5,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 3.6,
        },
      }}>
      <NextImage alt={'fire'} src={variants[state].src} width={30} height={34} priority />
    </Box>
  )
}

export default Fire
