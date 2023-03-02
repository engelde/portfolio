import { FC } from 'react'
import useSWR from 'swr'
import { Box, BoxProps, Heading, HStack, Icon, Kbd, Text, VStack } from '@chakra-ui/react'
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiArrowUp } from 'react-icons/fi'
import Code from '@/components/Code'

type Props = BoxProps & {}

const Intro: FC<Props> = ({ ...rest }: Props) => {
  const { data } = useSWR('/api/ip', (url: string) => fetch(url).then((res) => res.json()))

  return (
    <Box
      zIndex={999}
      position={'fixed'}
      top={8}
      left={4}
      py={3}
      maxW={'calc(100vw - 2rem)'}
      className={'animate__animated animate__fadeInDown'}
      {...rest}>
      <VStack alignItems={'left'} spacing={2}>
        <Heading
          size={'4xl'}
          color={'purple.500'}
          pb={6}
          textShadow={'2px 2px rgba(0, 0, 0, 0.09)'}
          className={'animate__animated animate__slow animate__pulse'}>
          <Code text={'<h1>'} />
          Hello
          <Text as={'span'} display={{ base: 'block', sm: 'inline' }}>
            .World()
            <Code text={'</h1>'} />
          </Text>
        </Heading>
        <Text
          fontSize={'xl'}
          maxWidth={820}
          textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
          className={'animate__animated animate__fadeInLeft'}>
          <Code text={'<p>'} />
          Thanks for visiting my site,{' '}
          <Text as={'span'} color={'cyan.500'} fontWeight={'bold'}>
            {data?.address}
          </Text>
          ! My name is David Engel and I am a software engineer. Here you can learn a little bit
          about me and the type of work I like doing. This site was built with TypeScript and
          Next.js. It&apos;s a work in progress but feel free to take a look around!
          <Text
            as={'span'}
            display={'inline'}
            className={'animate__animated animate__infinite animate__flash'}>
            |
          </Text>
          <Code text={'</p>'} />
        </Text>
      </VStack>

      <HStack color={'black'} spacing={8} mt={8} display={{ base: 'none', lg: 'flex' }}>
        <HStack color={'black'} spacing={1}>
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
