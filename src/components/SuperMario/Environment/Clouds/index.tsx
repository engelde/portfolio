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
  variant: 'a' | 'b'
}

type VariantProps = {
  [variant: string]: {
    src: string
    height: number
    width: number
  }
}

type Props = {}

const Clouds: FC<Props> = ({}: Props) => {
  const clouds: CloudProps[] = [
    {
      y: 4,
      scale: 0.75,
      opacity: 0.45,
      duration: 90,
      delay: 0,
      variant: 'a',
    },
    {
      y: 33,
      scale: 0.8,
      opacity: 0.4,
      duration: 115,
      delay: 3,
      variant: 'b',
    },
    {
      y: 15,
      scale: 0.9,
      opacity: 0.45,
      duration: 140,
      delay: 14,
      variant: 'b',
    },
    {
      y: 42,
      scale: 0.9,
      opacity: 0.4,
      duration: 145,
      delay: 37,
      variant: 'a',
    },
    {
      y: 24,
      scale: 0.8,
      opacity: 0.5,
      duration: 140,
      delay: 66,
      variant: 'b',
    },
    {
      y: 20,
      scale: 0.8,
      opacity: 0.5,
      duration: 175,
      delay: 90,
      variant: 'b',
    },
    {
      y: 30,
      scale: 0.85,
      opacity: 0.4,
      duration: 115,
      delay: 140,
      variant: 'a',
    },
    {
      y: 14,
      scale: 0.7,
      opacity: 0.4,
      duration: 90,
      delay: 145,
      variant: 'a',
    },
  ]

  const variants: VariantProps = {
    a: {
      src: '/images/clouds/clouds.1.png',
      height: 120,
      width: 166,
    },
    b: {
      src: '/images/clouds/clouds.2.png',
      height: 120,
      width: 250,
    },
  }

  return (
    <Box zIndex={-99} position={'fixed'} top={0} left={0} width={'100vw'}>
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
              repeat: 1,
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
