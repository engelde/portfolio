'use client'

import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import type { FC } from 'react'

const Sun: FC = () => {
  return (
    <Box
      as={motion.div}
      position={'fixed'}
      top={0}
      right={0}
      minW={'full'}
      initial={{ translateX: '150%', translateY: '150%' }}
      animate={{ translateX: 0, translateY: 0, transition: { delay: 0.3, ease: 'linear' } }}
    >
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
          marginTop: [35, -125, -125, -300, -300, -125, 35, 35],
          marginRight: [35, -125, -125, -300, -300, -125, 35, 35],
          scale: [0.8, 0.9, 0.9, 1, 1, 0.9, 0.9, 0.8],
          transition: {
            type: 'keyframes',
            delay: 0,
            times: [0, 0.36, 0.4, 0.48, 0.56, 0.64, 0.94, 1],
            duration: 90,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 0,
          },
        }}
      >
        <NextImage alt={'sun'} src={'/images/sun/sun.png'} width={240} height={240} priority />
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
          marginTop: [35, -125, -125, -300, -300, -125, 35, 35],
          marginRight: [35, -125, -125, -300, -300, -125, 35, 35],
          scale: [0.8, 0.9, 0.9, 1, 1, 0.9, 0.9, 0.8],
          transition: {
            type: 'keyframes',
            times: [0, 0.36, 0.4, 0.48, 0.56, 0.64, 0.94, 1],
            delay: 0,
            duration: 90,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 0,
          },
        }}
      >
        <NextImage
          alt={'sun'}
          src={'/images/sun/sun.png'}
          width={215}
          height={215}
          draggable={false}
          priority
        />
      </Box>
    </Box>
  )
}

export default Sun
