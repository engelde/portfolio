import { FC } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { Box, Flex, Heading, HStack, Link, useMediaQuery, VStack } from '@chakra-ui/react'
import config from '@/utilities/config'
import styles from './styles.module.css'

type Props = {
  x: number
  y: number
}

const End: FC<Props> = ({ x, y }: Props) => {
  const [mobile] = useMediaQuery('(max-width: 36rem)')

  return (
    <Box
      zIndex={9999}
      position={'absolute'}
      left={x + 'px'}
      bottom={y + 'px'}
      p={0}
      h={'100vh'}
      w={'150vw'}
      justifyContent={'center'}
      bg={'black'}
      className={'animate__animated animate__fadeInUp ' + styles.end}>
      <Flex h={'100vh'} w={'100vw'} alignItems={'center'} justifyContent={'center'}>
        <VStack spacing={0}>
          <Box
            mt={-16}
            mb={4}
            height={'248px'}
            width={'300px'}
            overflow={'hidden'}
            borderRadius={'160px'}
            className={'animate__animated animate__infinite animate__slow animate__pulse'}>
            <NextImage
              alt={'Fireworks'}
              src={'/media/fireworks/fireworks.webp'}
              height={248}
              width={300}
              quality={80}
              priority
            />
            <Box
              position={'absolute'}
              left={0}
              top={0}
              height={'full'}
              width={'full'}
              borderRadius={'160px'}
              boxShadow={'0 0 20px 20px black inset'}
            />
          </Box>

          <Heading
            size={mobile ? '2xl' : '4xl'}
            fontSize={mobile ? '86px' : '100px'}
            textAlign={'center'}
            lineHeight={0.7}
            className={'animate__animated animate__infinite animate__slow animate__pulse'}
            _hover={{ color: 'cyan.500' }}>
            <Link as={NextLink} href={'https://github.com/engelde/portfolio'} target={'_blank'}>
              {'> view source'}
            </Link>
          </Heading>

          <Heading
            size={mobile ? 'xl' : '2xl'}
            fontSize={mobile ? '36px' : '42px'}
            textAlign={'center'}
            pt={6}>
            {'© ' + config.app.author}
          </Heading>

          <HStack justifyContent={'center'} verticalAlign={'middle'} pt={8} spacing={4}>
            <Link as={NextLink} href={'https://github.com/engelde'} target={'_blank'}>
              <Box
                cursor={'pointer'}
                _hover={{ filter: 'brightness(85%)' }}
                className={'animate__animated animate__infinite animate__slow animate__pulse'}>
                <NextImage
                  alt={'GitHub'}
                  title={'GitHub'}
                  src={'/images/github/github.png'}
                  width={58}
                  height={60}
                  quality={80}
                  priority
                />
              </Box>
            </Link>

            <Link as={NextLink} href={'https://www.linkedin.com/in/engelde'} target={'_blank'}>
              <Box
                cursor={'pointer'}
                _hover={{ filter: 'brightness(85%)' }}
                className={'animate__animated animate__infinite animate__slow animate__pulse'}>
                <NextImage
                  alt={'LinkedIn'}
                  title={'LinkedIn'}
                  src={'/images/linkedin/linkedin.png'}
                  width={60}
                  height={60}
                  quality={80}
                  priority
                />
              </Box>
            </Link>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}

export default End
