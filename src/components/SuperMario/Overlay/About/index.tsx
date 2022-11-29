import { FC } from 'react'
import NextImage from 'next/image'
import { Box, BoxProps, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import Code from '@/components/Code'

const Bio = (
  <Text
    fontSize={'xl'}
    pb={2}
    textShadow={'1px 1px rgba(0, 0, 0, 0.14)'}
    className={'animate__animated animate__fadeIn'}
    maxWidth={680}>
    <Code text={'<p>'} />
    {
      "I am a senior full stack software engineer with 9 years of experience delivering successful projects to senior management, clients, and investors. I have a Master's in Software Engineering from DePaul University and I currently work at the University of Southern California. When I'm not making things, I enjoy going on new adventures with my amazing wife, Annie, and my awesome dog, Frodo."
    }
    <Text
      as={'span'}
      display={'inline'}
      className={'animate__animated animate__infinite animate__flash'}>
      |
    </Text>
    <Code text={'</p>'} />
  </Text>
)

const Experience = (
  <VStack alignItems={'left'} spacing={4}>
    <VStack alignItems={'left'}>
      <Heading
        size={'2xl'}
        color={'green.400'}
        pb={0}
        textShadow={'1px 1px rgba(0, 0, 0, 0.14)'}
        className={'animate__animated animate__tada'}>
        <Code text={'<h2>'} />
        Education
        <Code text={'</h2>'} />
      </Heading>

      <HStack spacing={12}>
        <Heading
          fontWeight={'500'}
          size={'md'}
          mt={0}
          textShadow={'1px 1px rgba(0, 0, 0, 0.14)'}
          className={'animate__animated animate__fadeInUpBig'}>
          Master of Science
          <br />
          Software Engineering
          <br />
          <strong>Depaul University</strong>
          <br />
        </Heading>

        <Heading
          fontWeight={'500'}
          size={'md'}
          mt={0}
          textShadow={'1px 1px rgba(0, 0, 0, 0.14)'}
          className={'animate__animated animate__fadeInUpBig'}>
          Bachelor of Arts
          <br />
          English
          <br />
          <strong>University of Missouri KC</strong>
          <br />
        </Heading>
      </HStack>
    </VStack>

    <VStack alignItems={'left'}>
      <Heading
        size={'2xl'}
        color={'orange.400'}
        pb={0}
        textShadow={'1px 1px rgba(0, 0, 0, 0.14)'}
        className={'animate__animated animate__tada'}>
        <Code text={'<h2>'} />
        Experience
        <Code text={'</h2>'} />
      </Heading>

      <HStack spacing={12}>
        <Heading
          fontWeight={'500'}
          size={'md'}
          mt={0}
          textShadow={'1px 1px rgba(0, 0, 0, 0.14)'}
          className={'animate__animated animate__fadeInUpBig'}>
          Web and Systems Manager
          <Text
            as={'span'}
            fontWeight={'500'}
            size={'md'}
            mt={0}
            display={'inline'}
            color={'red.500'}
            className={'animate__animated animate__slow animate__infinite animate__flash'}>
            {' (current!)'}
          </Text>
          <br />
          Cultural Relations and University Events
          <br />
          <strong>University of Southern California</strong>
          <br />
        </Heading>
      </HStack>
    </VStack>
  </VStack>
)

type Props = BoxProps & {
  stage: 1 | 2
}

const About: FC<Props> = ({ stage, ...rest }: Props) => {
  return (
    <Box
      zIndex={9992}
      position={'fixed'}
      top={8}
      left={4}
      py={3}
      maxW={'calc(100vw - 2rem)'}
      className={'animate__animated animate__fadeInDown'}
      {...rest}>
      <Heading
        size={'4xl'}
        color={stage == 1 ? 'blue.400' : 'cyan.500'}
        pb={6}
        textShadow={'2px 2px rgba(0, 0, 0, 0.14)'}
        className={'animate__animated animate__fadeInDown'}>
        <Code text={'<h1>'} />
        About()
        <Code text={'</h1>'} />
      </Heading>

      <HStack mb={2} spacing={{ base: 4, md: 8 }} alignItems={'top'} justifyContent={'flex-start'}>
        <VStack alignItems={'left'}>
          <Box
            width={{ base: 130, md: 300 }}
            height={{ base: 130, md: 300 }}
            border={4}
            borderStyle={'solid'}
            borderColor={'black'}
            rounded={'lg'}
            boxShadow={'2px 2px rgba(0,0,0,.2)'}
            overflow={'hidden'}
            className={'animate__animated animate__infinite animate__slow animate__pulse'}>
            <NextImage
              alt={stage === 1 ? 'Me' : 'Family'}
              src={stage === 1 ? '/images/me/me.png' : '/images/family/family.png'}
              layout={'fill'}
              objectFit={'cover'}
              quality={90}
              priority
            />
          </Box>
        </VStack>

        <VStack alignItems={'top'} spacing={{ base: 4, md: 8 }}>
          <Heading
            size={'2xl'}
            textShadow={'1px 1px rgba(0, 0, 0, 0.14)'}
            className={'animate__animated animate__fadeIn'}>
            David Engel
          </Heading>

          {(stage == 1 && (
            <>
              <VStack alignItems={'left'} spacing={0}>
                {['Full Stack Software Engineer', 'Los Angeles, CA'].map((text, x) => (
                  <Text key={x} className={'animate__animated animate__tada'}>
                    <Code text={'// ' + text} color={'gray.300'} fontWeight={300} />
                  </Text>
                ))}
              </VStack>

              <Box display={{ base: 'none', md: 'flex' }}>{Bio}</Box>
            </>
          )) || (
            <>
              <Text className={'animate__animated animate__headShake'}>
                <Code
                  text={
                    '// "Wise men say forgiveness is divine but never pay full price for late pizza."'
                  }
                  color={'gray.300'}
                  fontWeight={300}
                />
              </Text>

              <Box display={{ base: 'none', md: 'flex' }}>{Experience}</Box>
            </>
          )}
        </VStack>
      </HStack>

      <Box display={{ base: 'flex', md: 'none' }}>
        {(stage == 1 && Bio) || (stage == 2 && Experience)}
      </Box>
    </Box>
  )
}

export default About
