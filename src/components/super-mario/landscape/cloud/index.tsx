'use client'

import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import type { FC } from 'react'

export type CloudProps = {
  x: number
  y: number
}

const Cloud: FC<CloudProps> = ({ x, y }: CloudProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={'80px'}
      h={'80px'}
      initial={{ translateY: '150%' }}
      animate={{ translateY: 0, transition: { delay: 0.3, ease: 'linear' } }}
    >
      <NextImage
        alt={'cloud'}
        src={'/images/cloud/cloud.3.png'}
        width={80}
        height={80}
        draggable={false}
        priority
      />
    </Box>
  )
}

export default Cloud
