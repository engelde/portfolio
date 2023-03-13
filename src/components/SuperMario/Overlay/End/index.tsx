import { FC } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { Box, Button, Flex, Heading, HStack, Link, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import config from '@/utilities/config'

export type EndProps = {
  x: number
  xPos: number
}

const End: FC<EndProps> = ({ x, xPos }: EndProps) => {
  const router = useRouter()

  return (
    <Box
      zIndex={20}
      position={'absolute'}
      left={x + 'px'}
      bottom={0}
      p={0}
      h={'100vh'}
      w={'150vw'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={'black'}
      _after={{
        background:
          'linear-gradient(-45deg, #000 16px, transparent 0), linear-gradient(0deg, #000 0px, transparent 0), linear-gradient(-135deg, #000 16px, transparent 0)',
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'left top',
        backgroundSize: '32px 32px',
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '-26px',
        bottom: 0,
        width: '32px',
        height: '100%',
      }}>
      <Flex
        h={'100vh'}
        w={'100vw'}
        bg={'url(/images/clear/clear.png)'}
        backgroundRepeat={'no-repeat'}
        backgroundPosition={'bottom center'}
        backgroundSize={'contain'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Box
          as={motion.div}
          alignItems={'center'}
          justifyContent={'center'}
          marginTop={'-2000px'}
          {...(xPos >= x && {
            initial: { marginTop: -2000 },
            animate: { marginTop: 0, transition: { duration: 0.6 } },
          })}>
          <VStack spacing={0}>
            <Box
              as={motion.div}
              w={'300px'}
              h={'248px'}
              mt={-16}
              mb={4}
              borderRadius={'160px'}
              boxShadow={'0 0 25px 25px black inset'}
              overflow={'hidden'}
              initial={{ scale: 1 }}
              whileInView={{
                scale: [1, 1.06, 1],
                transition: {
                  type: 'keyframes',
                  times: [0, 0.5, 1],
                  delay: 0,
                  duration: 1.6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  repeatDelay: 0,
                },
              }}>
              <NextImage
                alt={'fireworks'}
                src={'/media/fireworks/fireworks.webp'}
                height={248}
                width={300}
                priority
              />
            </Box>

            <Box py={8}>
              <Button
                as={motion.div}
                variant={'outline'}
                colorScheme={'white'}
                size={'lg'}
                cursor={'pointer'}
                _hover={{
                  bg: 'red.500',
                  color: 'white',
                  borderColor: 'red.500',
                }}
                initial={{ scale: 1 }}
                whileInView={{
                  scale: [1, 1.05, 1],
                  transition: {
                    type: 'keyframes',
                    times: [0, 0.5, 1],
                    delay: 0,
                    duration: 1.6,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'loop',
                    repeatDelay: 0,
                  },
                }}
                onClick={() => router.reload()}>
                {'> Restart'}
              </Button>
            </Box>

            <Heading
              as={motion.div}
              size={{ base: '4xl', md: '4xl' }}
              fontSize={{ base: '86px', md: '100px' }}
              textAlign={'center'}
              lineHeight={0.7}
              _hover={{ color: 'cyan.500' }}
              initial={{ scale: 1 }}
              whileInView={{
                scale: [1, 1.06, 1],
                transition: {
                  type: 'keyframes',
                  times: [0, 0.5, 1],
                  delay: 0,
                  duration: 1.6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  repeatDelay: 0,
                },
              }}>
              <Link as={NextLink} href={'https://github.com/engelde/portfolio'} target={'_blank'}>
                {'> view source'}
              </Link>
            </Heading>

            <Heading
              size={{ base: 'xl', md: '2xl' }}
              fontSize={{ base: '36px', md: '42px' }}
              textAlign={'center'}
              pt={6}>
              {'© ' + config.app.author}
            </Heading>

            <HStack justifyContent={'center'} verticalAlign={'middle'} pt={8} spacing={4}>
              <Link as={NextLink} href={'https://github.com/engelde'} target={'_blank'}>
                <Box
                  as={motion.div}
                  cursor={'pointer'}
                  _hover={{ filter: 'brightness(85%)' }}
                  initial={{ scale: 1 }}
                  whileInView={{
                    scale: [1, 1.06, 1],
                    transition: {
                      type: 'keyframes',
                      times: [0, 0.5, 1],
                      delay: 0,
                      duration: 1.6,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'loop',
                      repeatDelay: 0,
                    },
                  }}>
                  <NextImage
                    alt={'github'}
                    title={'github'}
                    src={'/images/github/github.png'}
                    width={58}
                    height={60}
                    priority
                  />
                </Box>
              </Link>

              <Link as={NextLink} href={'https://www.linkedin.com/in/engelde'} target={'_blank'}>
                <Box
                  as={motion.div}
                  cursor={'pointer'}
                  _hover={{ filter: 'brightness(85%)' }}
                  initial={{ scale: 1 }}
                  whileInView={{
                    scale: [1, 1.06, 1],
                    transition: {
                      type: 'keyframes',
                      times: [0, 0.5, 1],
                      delay: 0,
                      duration: 1.6,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'loop',
                      repeatDelay: 0,
                    },
                  }}>
                  <NextImage
                    alt={'linkedin'}
                    title={'linkedin'}
                    src={'/images/linkedin/linkedin.png'}
                    width={60}
                    height={60}
                    priority
                  />
                </Box>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default End
