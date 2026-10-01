'use client'

import { Text } from '@chakra-ui/react'

export type PointsProps = {
  x: number
  y: number
  total: number | string
}

const pointsFloat = 'sm-points-float'

const Points = ({ x, y, total }: PointsProps) => {
  return (
    <Text
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
      sx={{
        animation: `${pointsFloat} 0.8s ease-in-out forwards`,
      }}
    >
      {total}
    </Text>
  )
}

export default Points
