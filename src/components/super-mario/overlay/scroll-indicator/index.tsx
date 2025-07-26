'use client'

import type { FC } from 'react'
import { Flex, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export type ScrollIndicatorProps = {
  xPos: number
}

const ScrollIndicator: FC<ScrollIndicatorProps> = ({ xPos }: ScrollIndicatorProps) => {
  return (
    <Flex
      as={motion.div}
      zIndex={22}
      position={'fixed'}
      left={0}
      bottom={2}
      w={'full'}
      mb={2}
      alignItems={'center'}
      justifyContent={'center'}
      {...((xPos > 1200 && {
        initial: { translateY: 0 },
        animate: { translateY: '150%' },
      }) || {
        initial: { translateY: '150%' },
        animate: { translateY: 0, transition: { delay: 0.3 } },
      })}
    >
      <VStack
        as={motion.div}
        spacing={0}
        p={1}
        alignItems={'center'}
        justifyContent={'center'}
        initial={{ scale: 1 }}
        whileInView={{
          scale: [1, 1.05, 1],
          transition: {
            type: 'keyframes',
            times: [0, 0.5, 1],
            delay: 0,
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 0,
          },
        }}
      >
        <Text fontSize={'2xl'} color={'white'} textShadow={'2px 2px rgba(0, 0, 0, 0.28)'}>
          Scroll for more!
        </Text>
        <Text
          mt={-3}
          fontSize={'4xl'}
          color={'white'}
          textShadow={'2px 2px rgba(0, 0, 0, 0.28)'}
          transform={'scaleX(-1) rotate(90deg) '}
        >
          {'>'}
        </Text>
      </VStack>
    </Flex>
  )
}

export default ScrollIndicator
