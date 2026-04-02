'use client'

import { Box, Heading, HStack, Icon, Link, Text, Tooltip, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaAws, FaJava } from 'react-icons/fa6'
import {
  SiAnthropic,
  SiCloudflare,
  SiDocker,
  SiElasticsearch,
  SiFlask,
  SiGithub,
  SiGo,
  SiGraphql,
  SiHono,
  SiJavascript,
  SiKubernetes,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiSwift,
  SiTypescript,
  SiVercel,
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
      name: 'React',
      icon: SiReact,
      color: 'teal.300',
      link: 'https://react.dev',
      x: 7420,
    },
    {
      name: 'Next.js',
      icon: SiNextdotjs,
      color: 'black',
      link: 'https://nextjs.org',
      x: 7480,
    },
    {
      name: 'Node.js',
      icon: SiNodedotjs,
      color: 'green.600',
      link: 'https://nodejs.org',
      x: 7540,
    },
    {
      name: 'JavaScript',
      icon: SiJavascript,
      color: 'yellow.400',
      link: 'https://www.javascript.com',
      x: 7600,
    },
    {
      name: 'Hono',
      icon: SiHono,
      color: 'orange.400',
      link: 'https://hono.dev',
      x: 7660,
    },
    {
      name: 'Vue.js',
      icon: SiVuedotjs,
      color: 'green.400',
      link: 'https://vuejs.org',
      x: 7720,
    },
    {
      name: 'GraphQL',
      icon: SiGraphql,
      color: 'pink.400',
      link: 'https://graphql.org',
      x: 7780,
    },
    {
      name: 'Python',
      icon: SiPython,
      color: 'blue.500',
      link: 'https://www.python.org',
      x: 7840,
    },
    {
      name: 'Flask',
      icon: SiFlask,
      color: 'green.300',
      link: 'https://flask.palletsprojects.com',
      x: 7900,
    },
    {
      name: 'Golang',
      icon: SiGo,
      color: 'blue.300',
      link: 'https://golang.org',
      x: 7960,
    },
    {
      name: 'Swift',
      icon: SiSwift,
      color: 'red.500',
      link: 'https://swift.org',
      x: 8020,
    },
    {
      name: 'Rust',
      icon: SiRust,
      color: 'orange.400',
      link: 'https://www.rust-lang.org',
      x: 8080,
    },
    {
      name: 'PHP',
      icon: SiPhp,
      color: 'purple.400',
      link: 'https://www.php.net',
      x: 8140,
    },
    {
      name: 'Laravel',
      icon: SiLaravel,
      color: 'red.500',
      link: 'https://laravel.com',
      x: 8200,
    },
    {
      name: 'Java',
      icon: FaJava,
      color: 'blue.300',
      link: 'https://www.java.com',
      x: 8260,
    },
    {
      name: 'AWS',
      icon: FaAws,
      color: 'orange.400',
      link: 'https://aws.amazon.com',
      x: 8320,
    },
    {
      name: 'Cloudflare',
      icon: SiCloudflare,
      color: 'orange.400',
      link: 'https://www.cloudflare.com',
      x: 8380,
    },
    {
      name: 'Vercel',
      icon: SiVercel,
      color: 'black',
      link: 'https://vercel.com',
      x: 8440,
    },
    {
      name: 'Docker',
      icon: SiDocker,
      color: 'blue.400',
      link: 'https://www.docker.com',
      x: 8500,
    },
    {
      name: 'Kubernetes',
      icon: SiKubernetes,
      color: 'blue.600',
      link: 'https://kubernetes.io',
      x: 8540,
    },
    {
      name: 'PostgreSQL',
      icon: SiPostgresql,
      color: 'blue.400',
      link: 'https://www.postgresql.org',
      x: 8560,
    },
    {
      name: 'MySQL',
      icon: SiMysql,
      color: 'orange.400',
      link: 'https://www.mysql.com',
      x: 8620,
    },
    {
      name: 'ElasticSearch',
      icon: SiElasticsearch,
      color: 'blue.400',
      link: 'https://www.elastic.co/elasticsearch/',
      x: 8680,
    },
    {
      name: 'MongoDB',
      icon: SiMongodb,
      color: 'green.400',
      link: 'https://www.mongodb.com',
      x: 8740,
    },
    {
      name: 'Redis',
      icon: SiRedis,
      color: 'red.500',
      link: 'https://redis.io',
      x: 8800,
    },
    {
      name: 'Linux',
      icon: SiLinux,
      color: 'gray.200',
      link: 'https://ubuntu.com',
      x: 8860,
    },
    {
      name: 'Git',
      icon: SiGithub,
      color: 'black',
      link: 'https://github.com/engelde',
      x: 8920,
    },
    {
      name: 'Ollama',
      icon: SiOllama,
      color: 'gray.200',
      link: 'https://ollama.com',
      x: 8980,
    },
    {
      name: 'Anthropic',
      icon: SiAnthropic,
      color: 'black',
      link: 'https://www.anthropic.com',
      x: 9100,
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
