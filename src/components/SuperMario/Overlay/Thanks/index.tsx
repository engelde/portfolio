import { FC } from 'react'
import { Box, BoxProps, Heading, useMediaQuery } from '@chakra-ui/react'
import Code from '@/components/Code'

type Props = BoxProps & {
  xPos: number
  offset: number
}

const Thanks: FC<Props> = ({ xPos, offset, ...rest }: Props) => {
  const [mobile] = useMediaQuery('(max-width: 36rem)')

  return (
    <Box
      zIndex={999}
      position={'fixed'}
      top={12}
      left={8}
      ml={offset + 'px'}
      py={3}
      maxW={'calc(100vw - 2rem)'}
      className={'animate__animated animate__fadeInLeft'}
      {...rest}>
      <Code text={'<h1>'} />
      <Heading
        size={mobile ? '2xl' : '4xl'}
        fontSize={mobile ? '76px' : '100px'}
        color={'white'}
        textShadow={'md'}
        pb={2}
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
