import type { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export type BushProps = {
  x: number
  y: number
}

const Bush: FC<BushProps> = ({ x, y }: BushProps) => {
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
      animate={{ translateY: 0, transition: { delay: 0.3, ease: 'linear' } }}>
      <NextImage alt={'bush'} src={'/images/bush/bush.png'} width={80} height={80} priority />
    </Box>
  )
}

export default Bush
