import { FC } from 'react'
import { Box, Heading, HStack, Icon, Kbd, Text, VStack } from '@chakra-ui/react'
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiArrowUp } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Code from '@/components/Code'

export type IntroProps = {
  xPos: number
  xMin: number
  xMax: number
  ip: string
}

const Intro: FC<IntroProps> = ({ xPos, xMin, xMax, ip }: IntroProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={10}
      position={'fixed'}
      top={8}
      left={4}
      maxW={'calc(100vw - 2rem)'}
      py={3}
      {...((xPos > xMin &&
        xPos < xMax && {
          initial: { opacity: 0, marginTop: -600 },
          animate: { opacity: 1, marginTop: 0 },
        }) || {
        initial: { opacity: 1, marginTop: 0 },
        animate: { opacity: 0, marginTop: -600 },
      })}>
      <VStack alignItems={'left'} spacing={2}>
        <Heading
          as={motion.div}
          pb={6}
          size={'4xl'}
          color={'purple.500'}
          textShadow={'2px 2px rgba(0, 0, 0, 0.09)'}
          initial={{ scale: 1 }}
          whileInView={{
            scale: [1, 1.05, 1],
            transition: {
              type: 'keyframes',
              times: [0, 0.5, 1],
              delay: 0,
              duration: 1.1,
              ease: 'linear',
            },
          }}>
          <Code text={'<h1>'} />
          Hello
          <Text as={'span'} display={{ base: 'block', sm: 'inline' }}>
            .World()
            <Code text={'</h1>'} />
          </Text>
        </Heading>
        <Text
          as={motion.div}
          fontSize={'xl'}
          maxW={820}
          textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
          initial={{ opacity: 0, translateX: -2000 }}
          animate={{ opacity: 1, translateX: 0, transition: { duration: 0.6 } }}>
          <Code text={'<p>'} />
          Thanks for visiting my site,{' '}
          <Text as={'span'} color={'cyan.500'} fontWeight={'bold'}>
            {ip}
          </Text>
          ! My name is David Engel and I am a software engineer. Here you can learn a little bit
          about me and the type of work I like doing. This site was built with TypeScript and
          Next.js. It&apos;s a work in progress but feel free to take a look around!
          <Text
            as={motion.span}
            display={'inline'}
            initial={{ opacity: 1 }}
            whileInView={{
              opacity: [1, 0, 1, 0, 1],
              transition: {
                type: 'keyframes',
                times: [0, 0.25, 0.5, 0.75, 1],
                delay: 0,
                duration: 1.1,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
              },
            }}>
            |
          </Text>
          <Code text={'</p>'} />
        </Text>
      </VStack>

      <HStack
        as={motion.div}
        color={'black'}
        spacing={8}
        mt={8}
        display={{ base: 'none', lg: 'flex' }}
        initial={{ opacity: 0, translateX: -2000 }}
        animate={{ opacity: 1, translateX: 0, transition: { duration: 0.9 } }}>
        <HStack color={'black'} spacing={1}>
          <Text color={'white'} pr={2}>
            scroll or
          </Text>

          <Kbd bg={'white'} borderColor={'blackAlpha.300'}>
            <Icon as={FiArrowLeft} />
          </Kbd>
          <VStack spacing={0.5}>
            <Kbd bg={'white'} borderColor={'blackAlpha.300'}>
              <Icon as={FiArrowUp} />
            </Kbd>
            <Kbd bg={'white'} mb={''} borderColor={'blackAlpha.300'}>
              <Icon as={FiArrowDown} />
            </Kbd>
          </VStack>
          <Kbd bg={'white'} borderColor={'blackAlpha.300'}>
            <Icon as={FiArrowRight} />
          </Kbd>

          <Text color={'white'} pl={2}>
            to move
          </Text>
        </HStack>

        <HStack color={'black'} spacing={1}>
          <Kbd bg={'white'} borderColor={'blackAlpha.300'}>
            esc
          </Kbd>

          <Text color={'white'} pl={2}>
            to pause
          </Text>
        </HStack>
      </HStack>
    </Box>
  )
}

export default Intro
