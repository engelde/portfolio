import { FC } from 'react'
import NextImage from 'next/image'
import { Box, BoxProps } from '@chakra-ui/react'

type Props = BoxProps & {
  xPos: number
  offset: number
}

const Dog: FC<Props> = ({ xPos, offset, ...rest }: Props) => {
  return (
    <Box
      p={2}
      zIndex={999}
      position={'fixed'}
      top={48}
      left={8}
      ml={offset + 'px'}
      className={'animate__animated animate__fadeInLeft'}
      {...rest}>
      <Box
        width={{ base: 225, md: 300 }}
        height={{ base: 225, md: 300 }}
        border={4}
        borderStyle={'solid'}
        borderColor={'black'}
        rounded={'lg'}
        boxShadow={'2px 2px rgba(0,0,0,.2)'}
        overflow={'hidden'}
        className={'animate__animated animate__infinite animate__slow animate__pulse'}>
        <NextImage
          alt={'Dog'}
          src={'/images/dog/dog.png'}
          layout={'fill'}
          objectFit={'cover'}
          quality={90}
          priority
        />
      </Box>
    </Box>
  )
}

export default Dog
