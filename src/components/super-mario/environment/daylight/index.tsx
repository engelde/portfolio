'use client'

import type { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Daylight: FC = () => {
  return (
    <Box
      as={motion.div}
      position={'fixed'}
      top={0}
      left={0}
      minW={'100vw'}
      minH={'100vh'}
      backgroundSize={'100% 800%'}
      backgroundImage={'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%)'}
      initial={{ backgroundPosition: '50% 0%' }}
      animate={{
        backgroundPosition: ['50% 0%', '50% 100%', '50% 0%'],
        transition: {
          type: 'keyframes',
          delay: 0,
          duration: 90,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        },
      }}
    />
  )
}

export default Daylight
