import { FC } from 'react'
import NextLink from 'next/link'
import { Box, Heading, HStack, Image, Link, VStack } from '@chakra-ui/react'
import config from '@/utilities/config'
import styles from './styles.module.css'

type Props = {
  x: number
  y: number
}

const End: FC<Props> = ({ x, y }: Props) => {
  return (
    <Box
      zIndex={9999}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      p={0}
      h={'100vh'}
      w={'calc(100vw + 40px)'}
      justifyContent={'center'}
      bg={'#020204'}
      className={'animate__animated animate__fadeInUp ' + styles.end}>
      <VStack spacing={0}>
        <Image
          src={'/media/fireworks/fireworks.webp'}
          height={'auto'}
          width={'300px'}
          alt={'The End'}
          mt={16}
          mb={4}
          boxShadow={'2px 2px rgba(0,0,0,.2)'}
          className={'animate__animated animate__infinite animate__slow animate__pulse'}
        />

        <Heading
          size={'4xl'}
          fontSize={'100px'}
          textAlign={'center'}
          lineHeight={0.7}
          className={'animate__animated animate__infinite animate__slow animate__pulse'}
          _hover={{ color: 'blue.300' }}>
          <Link as={NextLink} href={'https://github.com/engelde/portfolio'} target={'_blank'}>
            {'> view source'}
          </Link>
        </Heading>

        <Heading size={'2xl'} fontSize={'42px'} textAlign={'center'} pt={6}>
          {'© ' + config.app.author}
        </Heading>

        <HStack justifyContent={'center'} verticalAlign={'middle'} pt={8} spacing={2}>
          <Link as={NextLink} href={'https://github.com/engelde'} target={'_blank'}>
            <Image
              src={'/images/github/github.png'}
              width={'auto'}
              height={'60px'}
              alt={'GitHub'}
              cursor={'pointer'}
              className={'animate__animated animate__infinite animate__slow animate__pulse'}
            />
          </Link>

          <Link as={NextLink} href={'https://www.linkedin.com/in/engelde'} target={'_blank'}>
            <Image
              src={'/images/linkedin/linkedin.png'}
              width={'auto'}
              height={'60px'}
              alt={'Linkedin'}
              cursor={'pointer'}
              className={'animate__animated animate__infinite animate__slow animate__pulse'}
            />
          </Link>
        </HStack>
      </VStack>
    </Box>
  )
}

export default End
