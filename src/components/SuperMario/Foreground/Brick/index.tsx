import { FC } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export type BrickProps = {
  x: number
  y: number
}

const Brick: FC<BrickProps> = ({ x, y }: BrickProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={1}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      w={'80px'}
      h={'80px'}
      initial={{ filter: 'brightness(100%)' }}
      animate={{
        filter: ['brightness(100%)', 'contrast(102.5%) brightness(102.5%)', 'brightness(100%)'],
        transition: {
          type: 'keyframes',
          times: [0, 0.5, 1],
          delay: 0,
          duration: 0.8,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0,
        },
      }}>
      <NextImage alt={'brick'} src={'/images/brick/brick.png'} width={80} height={80} priority />
    </Box>
  )
}

export default Brick
