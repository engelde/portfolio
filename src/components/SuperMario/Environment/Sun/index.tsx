import { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type Props = {}

const Sun: FC<Props> = ({}: Props) => {
  return (
    <Box
      as={motion.div}
      zIndex={-99}
      position={'fixed'}
      top={0}
      right={0}
      minW={'full'}
      initial={{ marginTop: -300, marginRight: -300 }}
      animate={{ marginTop: 0, marginRight: 0 }}>
      <Box
        as={motion.div}
        position={'absolute'}
        top={0}
        right={0}
        w={240}
        h={240}
        opacity={0.4}
        initial={{ marginTop: 35, marginRight: 35 }}
        animate={{
          marginTop: [35, -125, -125, -300, -125, 35, 35],
          marginRight: [35, -125, -125, -300, -125, 35, 35],
          scale: [1, 1.1, 1.1, 1.2, 1.1, 1, 1],
          transition: {
            type: 'keyframes',
            delay: 0,
            times: [0, 0.36, 0.42, 0.52, 0.62, 0.94, 1],
            duration: 90,
            ease: 'linear',
            repeat: 1,
            repeatType: 'loop',
            repeatDelay: 0,
          },
        }}>
        <NextImage
          alt={'sun shadow'}
          src={'/images/sun/sun.png'}
          width={240}
          height={240}
          priority
        />
      </Box>

      <Box
        as={motion.div}
        position={'absolute'}
        top={12.5}
        right={12.5}
        w={215}
        h={215}
        opacity={0.9}
        initial={{ marginTop: 35, marginRight: 35 }}
        animate={{
          marginTop: [35, -125, -125, -300, -125, 35, 35],
          marginRight: [35, -125, -125, -300, -125, 35, 35],
          scale: [1, 1.1, 1.1, 1.2, 1.1, 1, 1],
          transition: {
            type: 'keyframes',
            delay: 0,
            times: [0, 0.36, 0.42, 0.52, 0.62, 0.94, 1],
            duration: 90,
            ease: 'linear',
            repeat: 1,
            repeatType: 'loop',
            repeatDelay: 0,
          },
        }}>
        <NextImage alt={'sun'} src={'/images/sun/sun.png'} width={215} height={215} priority />
      </Box>
    </Box>
  )
}

export default Sun
