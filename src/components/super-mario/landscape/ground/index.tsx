'use client'

import { Box, HStack } from '@chakra-ui/react'

export type GroundProps = {
  x: number
  width: number
  height: number
}

const Ground = ({ x, width, height }: GroundProps) => {
  return (
    <Box zIndex={21} position={'absolute'} left={x + 'px'} bottom={0} w={width + 'px'}>
      <HStack spacing={0}>
        <Box
          w={'12px'}
          h={height + 'px'}
          bg={
            'url("/_next/image?url=%2Fimages%2Fground%2Fground.1.png&w=256&q=75") no-repeat left top'
          }
          backgroundSize={'12px 128px'}
          overflow={'hidden'}
        />
        <Box
          w={width - 16 + 'px'}
          h={height + 'px'}
          bg={
            'url("/_next/image?url=%2Fimages%2Fground%2Fground.2.png&w=256&q=75") repeat-x left top'
          }
          backgroundSize={'64px 128px'}
          overflow={'hidden'}
        />
        <Box
          w={'4px'}
          h={height + 'px'}
          bg={
            'url("/_next/image?url=%2Fimages%2Fground%2Fground.3.png&w=128&q=75") no-repeat left top'
          }
          backgroundSize={'4px 128px'}
          overflow={'hidden'}
        />
      </HStack>
    </Box>
  )
}

export default Ground
