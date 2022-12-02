import { FC } from 'react'
import { HStack, Box } from '@chakra-ui/react'

type Props = {
  variant: number
  x: number
  height: number
  width: number
}

const Ground: FC<Props> = ({ variant, x, height, width }: Props) => {
  return (
    <Box width={width + 'px'} zIndex={-99} position={'absolute'} bottom={0} left={x + 'px'} p={0}>
      <HStack spacing={0}>
        <Box
          height={height + 'px'}
          width={'12px'}
          bg={
            'url("/_next/image?url=%2Fimages%2Fground%2Fground.1.png&w=256&q=80") no-repeat left top'
          }
          backgroundSize={'12px 128px'}
          overflow={'hidden'}
        />
        <Box
          height={height + 'px'}
          width={width - 16 + 'px'}
          bg={
            'url("/_next/image?url=%2Fimages%2Fground%2Fground.2.png&w=256&q=80") repeat-x left top'
          }
          backgroundSize={'64px 128px'}
          overflow={'hidden'}
        />
        <Box
          height={height + 'px'}
          width={'4px'}
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
