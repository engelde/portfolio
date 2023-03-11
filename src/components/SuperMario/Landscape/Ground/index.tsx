import { FC } from 'react'
import { HStack, Box } from '@chakra-ui/react'

type Props = {
  x: number
  height: number
  width: number
}

const Ground: FC<Props> = ({ x, height, width }: Props) => {
  return (
    <Box zIndex={5} position={'absolute'} left={x + 'px'} bottom={0} w={width + 'px'}>
      <HStack spacing={0}>
        <Box
          w={'12px'}
          h={height + 'px'}
          bg={
            'url("/_next/image?url=%2Fimages%2Fground%2Fground.1.png&w=256&q=80") no-repeat left top'
          }
          backgroundSize={'12px 128px'}
          overflow={'hidden'}
        />
        <Box
          w={width - 16 + 'px'}
          h={height + 'px'}
          bg={
            'url("/_next/image?url=%2Fimages%2Fground%2Fground.2.png&w=256&q=80") repeat-x left top'
          }
          backgroundSize={'64px 128px'}
          overflow={'hidden'}
        />
        <Box
          w={'4px'}
          h={height + 'px'}
          bg={
            'url("/_next/image?url=%2Fimages%2Fground%2Fground.3.png&w=128&q=80") no-repeat left top'
          }
          backgroundSize={'4px 128px'}
          overflow={'hidden'}
        />
      </HStack>
    </Box>
  )
}

export default Ground
