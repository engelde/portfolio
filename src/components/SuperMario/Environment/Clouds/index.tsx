import { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type CloudProps = {
  y: number
  scale: number
  opacity: number
  duration: number
  delay: number
  variant: 1 | 2
}

type VariantProps = {
  [variant: number]: {
    src: string
    width: number
    height: number
  }
}

type Props = {}

const Clouds: FC<Props> = ({}: Props) => {
  const clouds: CloudProps[] = [
    {
      y: 4,
      scale: 0.65,
      opacity: 0.45,
      duration: 90,
      delay: 0,
      variant: 1,
    },
    {
      y: 33,
      scale: 0.7,
      opacity: 0.4,
      duration: 115,
      delay: 3,
      variant: 2,
    },
    {
      y: 15,
      scale: 0.75,
      opacity: 0.45,
      duration: 140,
      delay: 14,
      variant: 2,
    },
    {
      y: 42,
      scale: 0.75,
      opacity: 0.4,
      duration: 145,
      delay: 37,
      variant: 1,
    },
    {
      y: 24,
      scale: 0.7,
      opacity: 0.5,
      duration: 140,
      delay: 66,
      variant: 2,
    },
    {
      y: 20,
      scale: 0.7,
      opacity: 0.5,
      duration: 175,
      delay: 90,
      variant: 2,
    },
    {
      y: 30,
      scale: 0.75,
      opacity: 0.4,
      duration: 115,
      delay: 140,
      variant: 1,
    },
    {
      y: 14,
      scale: 0.6,
      opacity: 0.4,
      duration: 90,
      delay: 145,
      variant: 1,
    },
  ]

  const variants: VariantProps = {
    1: {
      src: '/images/clouds/clouds.1.png',
      width: 166,
      height: 120,
    },
    2: {
      src: '/images/clouds/clouds.2.png',
      width: 250,
      height: 120,
    },
  }

  return (
    <Box zIndex={0} position={'fixed'} top={0} left={0} w={'100vw'}>
      {clouds.map((item, x) => (
        <Box
          key={x}
          as={motion.div}
          position={'fixed'}
          top={item.y + 'vh'}
          left={0}
          w={'full'}
          opacity={item.opacity}
          initial={{ marginLeft: '100%' }}
          animate={{
            marginLeft: '-140%',
            transition: {
              delay: item.delay,
              duration: item.duration,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 0,
            },
          }}>
          <NextImage
            alt={'cloud'}
            src={variants[item.variant].src}
            width={variants[item.variant].width * item.scale}
            height={variants[item.variant].height * item.scale}
            priority
          />
        </Box>
      ))}
    </Box>
  )
}

export default Clouds
