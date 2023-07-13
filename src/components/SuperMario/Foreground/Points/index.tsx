import type { FC } from 'react'
import { Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export type PointsProps = {
  x: number
  y: number
  total: number | string
}

const Points: FC<PointsProps> = ({ x, y, total }: PointsProps) => {
  return (
    <Text
      as={motion.div}
      zIndex={3}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 80 + 'px'}
      w={'80px'}
      h={'80px'}
      textAlign={'center'}
      fontWeight={'bold'}
      textShadow={'3px 3px rgba(0, 0, 0, 0.8)'}
      fontSize={'4xl'}
      p={0}
      initial={{ opacity: 0, translateY: 0 }}
      animate={{
        opacity: [0, 0, 1, 1, 0, 0],
        translateY: [80, 80, 0, 0, -20, -20],
        transition: {
          type: 'keyframes',
          times: [0, 0.2, 0.3, 0.7, 0.9, 1],
          delay: 0,
          duration: 0.8,
          ease: 'easeInOut',
        },
      }}>
      {total}
    </Text>
  )
}

export default Points
