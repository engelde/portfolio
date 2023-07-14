import type { FC, ReactNode } from 'react'
import NextImage from 'next/image'
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Code from '@/components/Code'

export type AboutProps = {
  xPos: number
  xMin: number
  xMax: number
  variant: 1 | 2
}

type VariantProps = {
  [variant: number]: {
    color: string
    image: string
    description: ReactNode
    content: ReactNode
  }
}

const BioDescription = (
  <VStack alignItems={'left'} spacing={0} mb={2}>
    {['Full Stack Software Engineer', 'Los Angeles, CA'].map((text, x) => (
      <Text
        key={x}
        as={motion.div}
        whileInView={{
          scaleX: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
          scaleY: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
          scaleZ: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
          rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 3, 0],
          transition: {
            type: 'keyframes',
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            delay: 0,
            duration: 1,
            ease: 'linear',
          },
        }}>
        <Code text={'// ' + text} color={'gray.300'} fontWeight={300} />
      </Text>
    ))}
  </VStack>
)

const BioContent = (
  <Text
    as={motion.div}
    maxW={680}
    pb={2}
    fontSize={'xl'}
    textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}>
    <Code text={'<p>'} />
    {
      "I am a senior full stack software engineer with 10 years of experience delivering successful projects to senior management, clients, and investors. I have an MS in Software Engineering from Depaul University and I currently enjoy working with TypeScript, React, GraphQL, Python, Node.js, Docker and AWS. I currently work at the University of Southern California but, when I'm not creating things, I enjoy going on new adventures with my amazing wife, Annie, and my awesome dog, Frodo."
    }
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
)

const ExperienceDescription = (
  <Text
    as={motion.div}
    mb={2}
    initial={{ translateX: 2400 }}
    animate={{ translateX: 0, transition: { duration: 0.6 } }}>
    <Code
      text={'// "Wise men say forgiveness is divine but never pay full price for late pizza."'}
      color={'gray.300'}
      fontWeight={300}
    />
  </Text>
)

const ExperienceContent = (
  <VStack alignItems={'left'} spacing={{ base: 4, md: 6 }}>
    <VStack alignItems={'left'}>
      <Heading
        as={motion.div}
        pb={0}
        size={'2xl'}
        color={'green.400'}
        textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
        whileInView={{
          scaleX: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
          scaleY: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
          scaleZ: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
          rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 3, 0],
          transition: {
            type: 'keyframes',
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            delay: 0,
            duration: 1,
            ease: 'linear',
          },
        }}>
        <Code text={'<h2>'} />
        Education
        <Code text={'</h2>'} />
      </Heading>

      <HStack spacing={12}>
        <Heading
          as={motion.div}
          mt={0}
          size={'md'}
          fontWeight={'500'}
          textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
          initial={{ translateY: 2000 }}
          animate={{ translateY: 0, transition: { duration: 0.6 } }}>
          Master of Science
          <br />
          Software Engineering
          <br />
          <strong>Depaul University</strong>
          <br />
        </Heading>

        <Heading
          as={motion.div}
          mt={0}
          size={'md'}
          fontWeight={'500'}
          textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
          initial={{ translateY: 2000 }}
          animate={{ translateY: 0, transition: { duration: 0.6 } }}>
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
        as={motion.div}
        pb={0}
        size={'2xl'}
        color={'orange.400'}
        textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
        whileInView={{
          scaleX: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
          scaleY: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
          scaleZ: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
          rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 3, 0],
          transition: {
            type: 'keyframes',
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            delay: 0,
            duration: 1,
            ease: 'linear',
          },
        }}>
        <Code text={'<h2>'} />
        Experience
        <Code text={'</h2>'} />
      </Heading>

      <HStack spacing={12}>
        <Heading
          as={motion.div}
          mt={0}
          size={'md'}
          fontWeight={'500'}
          textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
          initial={{ translateY: 2000 }}
          animate={{ translateY: 0, transition: { duration: 0.6 } }}>
          Web and Systems Manager
          <Text
            as={motion.span}
            mt={0}
            size={'md'}
            color={'red.500'}
            fontWeight={'500'}
            display={'inline'}
            initial={{ opacity: 1 }}
            whileInView={{
              opacity: [1, 0, 1, 0, 1],
              transition: {
                type: 'keyframes',
                times: [0, 0.25, 0.5, 0.75, 1],
                delay: 0,
                duration: 2,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
              },
            }}>
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

const About: FC<AboutProps> = ({ xPos, xMin, xMax, variant }: AboutProps) => {
  const variants: VariantProps = {
    1: {
      color: 'blue.400',
      image: '/images/me/me.png',
      description: BioDescription,
      content: BioContent,
    },
    2: {
      color: 'cyan.500',
      image: '/images/family/family.png',
      description: ExperienceDescription,
      content: ExperienceContent,
    },
  }

  return (
    <Box
      as={motion.div}
      zIndex={10}
      position={'fixed'}
      top={8}
      left={4}
      maxW={'calc(100vw - 2rem)'}
      py={3}
      visibility={xPos < 2000 ? 'hidden' : 'visible'}
      {...((xPos > xMin &&
        xPos < xMax && {
          initial: { opacity: 0, marginTop: -600 },
          animate: { opacity: 1, marginTop: 0 },
        }) || {
        initial: { opacity: 1, marginTop: 0 },
        animate: { opacity: 0, marginTop: -600 },
      })}>
      <Heading
        pb={6}
        size={'4xl'}
        color={variants[variant]?.color || 'white'}
        textShadow={'2px 2px rgba(0, 0, 0, 0.09)'}
        transition={'color .3s ease-in-out'}>
        <Code text={'<h1>'} />
        About()
        <Code text={'</h1>'} />
      </Heading>

      <HStack mb={2} spacing={{ base: 4, md: 8 }} alignItems={'top'} justifyContent={'flex-start'}>
        <VStack alignItems={'left'}>
          <Box
            as={motion.div}
            w={{ base: 130, md: 300 }}
            h={{ base: 130, md: 300 }}
            border={4}
            borderStyle={'solid'}
            borderColor={'black'}
            rounded={'lg'}
            boxShadow={'2px 2px rgba(0,0,0,.2)'}
            overflow={'hidden'}
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
            }}>
            <NextImage
              alt={'about'}
              src={variants[variant]?.image || ''}
              width={300}
              height={300}
              draggable={false}
              priority
            />
          </Box>
        </VStack>

        <VStack alignItems={'top'} spacing={4}>
          <Heading
            as={motion.div}
            size={'2xl'}
            textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}>
            David Engel
          </Heading>

          <Box>{variants[variant]?.description}</Box>

          <Box display={{ base: 'none', md: 'block' }}>{variants[variant]?.content}</Box>
        </VStack>
      </HStack>

      <Box mt={2} display={{ base: 'block', md: 'none' }}>
        {variants[variant]?.content}
      </Box>
    </Box>
  )
}

export default About
