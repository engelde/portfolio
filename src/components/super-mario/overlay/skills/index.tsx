'use client'

import { Box, Heading, HStack, Icon, Link, Text, Tooltip, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  SiAmazonwebservices,
  SiApollographql,
  SiDocker,
  SiFlask,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTrpc,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si'

import Code from '@/components/code'

export type SkillsProps = {
  xPos: number
  xMin: number
  xMax: number
  offset: number
}

const Skills = ({ xPos, xMin, xMax, offset }: SkillsProps) => {
  const skillset = [
    {
      name: 'TypeScript',
      icon: SiTypescript,
      color: 'blue.300',
      link: 'https://www.typescriptlang.org',
      x: 7360,
    },
    {
      name: 'React.js',
      icon: SiReact,
      color: 'teal.300',
      link: 'https://react.dev',
      x: 7440,
    },
    {
      name: 'Next.js',
      icon: SiNextdotjs,
      color: 'gray.800',
      link: 'https://nextjs.org',
      x: 7520,
    },
    {
      name: 'GraphQL',
      icon: SiGraphql,
      color: 'pink.400',
      link: 'https://graphql.org',
      x: 7600,
    },
    {
      name: 'Apollo',
      icon: SiApollographql,
      color: 'purple.600',
      link: 'https://www.apollographql.com',
      x: 7680,
    },
    {
      name: 'Node.js',
      icon: SiNodedotjs,
      color: 'green.600',
      link: 'https://nodejs.org',
      x: 7760,
    },
    {
      name: 'JavaScript',
      icon: SiJavascript,
      color: 'yellow.400',
      link: 'https://www.javascript.com',
      x: 7840,
    },
    {
      name: 'tRPC',
      icon: SiTrpc,
      color: 'blue.400',
      link: 'https://trpc.io',
      x: 7920,
    },
    {
      name: 'Prisma',
      icon: SiPrisma,
      color: 'purple.800',
      link: 'https://www.prisma.io',
      x: 8000,
    },
    {
      name: 'Vue.js',
      icon: SiVuedotjs,
      color: 'green.400',
      link: 'https://vuejs.org',
      x: 8080,
    },
    {
      name: 'Python',
      icon: SiPython,
      color: 'blue.500',
      link: 'https://www.python.org',
      x: 8160,
    },
    {
      name: 'Flask',
      icon: SiFlask,
      color: 'green.300',
      link: 'https://flask.palletsprojects.com',
      x: 8240,
    },
    {
      name: 'PHP',
      icon: SiPhp,
      color: 'purple.400',
      link: 'https://www.php.net',
      x: 8320,
    },
    {
      name: 'Laravel',
      icon: SiLaravel,
      color: 'red.500',
      link: 'https://laravel.com',
      x: 8400,
    },
    {
      name: 'AWS',
      icon: SiAmazonwebservices,
      color: 'orange.400',
      link: 'https://aws.amazon.com',
      x: 8480,
    },
    {
      name: 'Docker',
      icon: SiDocker,
      color: 'blue.500',
      link: 'https://www.docker.com',
      x: 8560,
    },
    {
      name: 'MongoDB',
      icon: SiMongodb,
      color: 'green.400',
      link: 'https://www.mongodb.com',
      x: 8640,
    },
    {
      name: 'PostgreSQL',
      icon: SiPostgresql,
      color: 'blue.400',
      link: 'https://www.postgresql.org',
      x: 8720,
    },
    {
      name: 'Git',
      icon: SiGit,
      color: 'orange.400',
      link: 'https://git-scm.com',
      x: 8800,
    },
    {
      name: 'Linux',
      icon: SiLinux,
      color: 'gray.300',
      link: 'https://ubuntu.com',
      x: 8880,
    },
  ]

  return (
    <Box
      as={motion.div}
      zIndex={10}
      position={'fixed'}
      top={8}
      left={6}
      maxW={'calc(100vw - 2rem)'}
      minW={'calc(100vw - 2rem)'}
      py={3}
      ml={offset - xPos > 0 ? offset - xPos : 0 + 'px'}
      visibility={xPos < 2000 ? 'hidden' : 'visible'}
      {...((xPos > xMin &&
        xPos < xMax && {
          initial: { opacity: 0, marginTop: -600 },
          animate: { opacity: 1, marginTop: 0 },
        }) || {
        initial: { opacity: 1, marginTop: 0 },
        animate: { opacity: 0, marginTop: -600 },
      })}
    >
      <Heading size={'4xl'} color={'red.500'} pb={2} textShadow={'2px 2px rgba(0, 0, 0, 0.09)'}>
        <Code text={'<h1>'} />
        Skills()
        <Code text={'</h1>'} />
      </Heading>

      <Text fontSize={'xl'} pb={6} textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}>
        <Code text={'<p>'} />
        {
          "I'm always exploring new things! Here are a few of my favorite languages, frameworks, and tools."
        }
        <Code text={'</p>'} />
      </Text>

      <HStack
        mb={2}
        spacing={{ base: 2, md: 3, lg: 4 }}
        alignItems={'top'}
        justifyContent={'flex-start'}
      >
        <VStack
          pl={{ base: 0, md: 1, lg: 2 }}
          pr={{ base: 0, md: 1, lg: 2 }}
          alignItems={'top'}
          spacing={{ base: 2, md: 4, lg: 8 }}
        >
          <Heading size={'2xl'} w={'full'} maxW={960}>
            {skillset.map(
              (skill, x) =>
                xPos > skill.x && (
                  <Box
                    key={x}
                    as={motion.div}
                    color={'white'}
                    display={'inline'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5 } }}
                  >
                    <Tooltip label={skill.name} bg={'black'} mt={-4}>
                      <Link
                        href={skill.link}
                        target={'_blank'}
                        referrerPolicy={'no-referrer'}
                        rel={'noopener'}
                      >
                        <Icon
                          as={skill.icon}
                          w={{ base: 10, sm: 12, md: 14, lg: 16 }}
                          h={{ base: 10, sm: 12, md: 14, lg: 16 }}
                          m={{ base: 3, md: 4 }}
                          color={'white'}
                          cursor={'pointer'}
                          _hover={{
                            color: skill.color,
                            transform: 'scale(1.25)',
                            transition: 'color .1s ease-in-out, transform .1s ease-in-out',
                          }}
                        />
                      </Link>
                    </Tooltip>
                  </Box>
                )
            )}
          </Heading>
        </VStack>
      </HStack>
    </Box>
  )
}

export default Skills
