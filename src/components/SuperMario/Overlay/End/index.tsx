import { FC } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { Box, Flex, Heading, HStack, Link, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import config from '@/utilities/config'

type Props = {
  x: number
}

const End: FC<Props> = ({ x }: Props) => {
  return (
    <Box
      zIndex={9999}
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
          'linear-gradient(-45deg, #020204 16px, transparent 0), linear-gradient(0deg, #020204 0px, transparent 0), linear-gradient(-135deg, #020204 16px, transparent 0)',
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'left top',
        backgroundSize: '32px 32px',
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '-23px',
        bottom: 0,
        width: '32px',
        height: '100%',
      }}>
      <Flex h={'100vh'} w={'100vw'} alignItems={'center'} justifyContent={'center'}>
        <VStack spacing={0}>
          <Box
            as={motion.div}
            w={'300px'}
            h={'248px'}
            mt={-16}
            mb={4}
            overflow={'hidden'}
            borderRadius={'160px'}
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
            <Box
              position={'absolute'}
              left={0}
              top={0}
              w={'full'}
              h={'full'}
              borderRadius={'160px'}
              boxShadow={'0 0 20px 20px black inset'}
            />
          </Box>

          <Heading
            as={motion.div}
            size={{ base: '2xl', md: '4xl' }}
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
      </Flex>
    </Box>
  )
}

export default End
