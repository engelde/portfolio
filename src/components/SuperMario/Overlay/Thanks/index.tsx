import { FC } from 'react'
import { Box, BoxProps, Heading } from '@chakra-ui/react'
import Code from '@/components/Code'

type Props = BoxProps & {
  xPos: number
  offset: number
}

const Thanks: FC<Props> = ({ xPos, offset, ...rest }: Props) => {
  return (
    <Box
      p={2}
      zIndex={999}
      position={'fixed'}
      top={16}
      left={8}
      ml={offset + 'px'}
      className={'animate__animated animate__fadeInLeft'}
      {...rest}>
      <Code text={'<h1>'} />
      <Heading
        size={'4xl'}
        color={'white'}
        pb={2}
        textShadow={'md'}
        fontSize={'100px'}
        className={'animate__animated animate__fadeInLeft'}>
        THANKS FOR
        <br />
        STOPPING BY!
      </Heading>
      <Code text={'</h1>'} />
    </Box>
  )
}

export default Thanks
