'use client'

import { Box, Heading } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import Code from '@/components/code'

export type ThanksProps = {
  xPos: number
  xMin: number
  xMax: number
  offset: number
}

const Thanks = ({ xPos, xMin, xMax, offset }: ThanksProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={10}
      position={'fixed'}
      top={12}
      left={4}
      maxW={'calc(100vw - 2rem)'}
      py={3}
      ml={(offset - xPos > 0 ? offset - xPos : 0) + 'px'}
      visibility={xPos < 2000 ? 'hidden' : 'visible'}
      {...((xPos > xMin &&
        xPos < xMax && {
          initial: { opacity: 0, marginTop: -600 },
          animate: { opacity: 1, marginTop: 0 },
        }) || {
        initial: { opacity: 0, marginTop: -600 },
        animate: { opacity: 0, marginTop: -600 },
      })}
      style={{ pointerEvents: 'none' }}
    >
      <Code text={'<h1>'} />
      <Heading
        fontSize={{ base: '64px', md: '92px', xl: '104px' }}
        color={'white'}
        textTransform={'uppercase'}
        textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
        lineHeight={1}
        pb={2}
      >
        THANKS FOR
        <br />
        STOPPING BY!
      </Heading>
      <Code text={'</h1>'} />
    </Box>
  )
}

export default Thanks
