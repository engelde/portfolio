'use client'

import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import type { FC } from 'react'
import { PiArrowElbowLeftUpBold } from 'react-icons/pi'

export type DogProps = {
  xPos: number
  xMin: number
  xMax: number
  offset: number
}

const Dog: FC<DogProps> = ({ xPos, xMin, xMax, offset }: DogProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={10}
      position={'fixed'}
      top={40}
      left={8}
      ml={(offset - xPos > 0 ? offset - xPos + (offset % xPos) / 2 : 0) + 'px'}
      visibility={xPos < 2000 ? 'hidden' : 'visible'}
      {...((xPos > xMin &&
        xPos < xMax && {
          initial: { opacity: 0, marginTop: -600 },
          animate: { opacity: 1, marginTop: 0, transition: { duration: 0.6 } },
        }) || {
        initial: { opacity: 1, marginTop: 0 },
        animate: { opacity: 1, marginTop: -600 },
      })}
    >
      <Box
        as={motion.div}
        w={{ base: 225, md: 275 }}
        h={{ base: 225, md: 275 }}
        border={4}
        borderStyle={'solid'}
        borderColor={'black'}
        rounded={'lg'}
        boxShadow={'2px 2px rgba(0,0,0,.2)'}
        overflow={'hidden'}
        initial={{ scale: 1 }}
        whileInView={{
          scale: [1, 1.05, 1],
          transition: {
            type: 'keyframes',
            times: [0, 0.5, 1],
            delay: 0,
            duration: 1.6,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 0,
          },
        }}
      >
        <NextImage
          alt={'dog'}
          src={'/images/dog/dog.png'}
          width={300}
          height={300}
          draggable={false}
          priority
        />
      </Box>
      <HStack
        as={motion.div}
        pl={4}
        pt={2}
        {...((xPos > xMin &&
          xPos < xMax && {
            initial: { opacity: 0, marginLeft: 1200 },
            animate: { opacity: 1, marginLeft: 0, transition: { duration: 0.8, delay: 0.6 } },
          }) || {
          initial: { opacity: 1, marginLeft: 0 },
          animate: { opacity: 1, marginLeft: 1200 },
        })}
      >
        <Icon as={PiArrowElbowLeftUpBold} boxSize={6} />

        <Text fontSize={'2xl'} mt={2}>
          {'Frodo'}
        </Text>
      </HStack>
    </Box>
  )
}

export default Dog
