import { FC } from 'react'
import { Box, BoxProps, Image } from '@chakra-ui/react'
import Code from '@/components/Code'

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
      <Image
        src={'/images/profile/dog.png'}
        width={{ base: 225, md: 300 }}
        height={'auto'}
        alt={'Frodo'}
        border={4}
        borderStyle={'solid'}
        borderColor={'black'}
        rounded={'lg'}
        boxShadow={'2px 2px rgba(0,0,0,.2)'}
        className={'animate__animated animate__infinite animate__slow animate__pulse'}
      />
    </Box>
  )
}

export default Dog
