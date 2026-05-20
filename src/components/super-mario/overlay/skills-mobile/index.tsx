'use client'

import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import Code from '@/components/code'

export type SkillsMobileProps = {
  xPos: number
  xMin: number
  xMax: number
  offset: number
}

const skillset = [
  { name: 'TypeScript', link: 'https://www.typescriptlang.org', x: 7360 },
  { name: 'React', link: 'https://react.dev', x: 7420 },
  { name: 'Next.js', link: 'https://nextjs.org', x: 7480 },
  { name: 'Node.js', link: 'https://nodejs.org', x: 7540 },
  { name: 'JavaScript', link: 'https://www.javascript.com', x: 7600 },
  { name: 'Hono', link: 'https://hono.dev', x: 7660 },
  { name: 'Vue.js', link: 'https://vuejs.org', x: 7720 },
  { name: 'GraphQL', link: 'https://graphql.org', x: 7780 },
  { name: 'Python', link: 'https://www.python.org', x: 7840 },
  { name: 'Flask', link: 'https://flask.palletsprojects.com', x: 7900 },
  { name: 'Golang', link: 'https://golang.org', x: 7960 },
  { name: 'Swift', link: 'https://swift.org', x: 8020 },
  { name: 'Rust', link: 'https://www.rust-lang.org', x: 8080 },
  { name: 'PHP', link: 'https://www.php.net', x: 8140 },
  { name: 'Laravel', link: 'https://laravel.com', x: 8200 },
  { name: 'Java', link: 'https://www.java.com', x: 8260 },
  { name: 'AWS', link: 'https://aws.amazon.com', x: 8320 },
  { name: 'Cloudflare', link: 'https://www.cloudflare.com', x: 8380 },
  { name: 'Vercel', link: 'https://vercel.com', x: 8440 },
  { name: 'Docker', link: 'https://www.docker.com', x: 8500 },
  { name: 'Kubernetes', link: 'https://kubernetes.io', x: 8540 },
  { name: 'PostgreSQL', link: 'https://www.postgresql.org', x: 8560 },
  { name: 'MySQL', link: 'https://www.mysql.com', x: 8620 },
  { name: 'ElasticSearch', link: 'https://www.elastic.co/elasticsearch/', x: 8680 },
  { name: 'MongoDB', link: 'https://www.mongodb.com', x: 8740 },
  { name: 'Redis', link: 'https://redis.io', x: 8800 },
  { name: 'Linux', link: 'https://ubuntu.com', x: 8860 },
  { name: 'Git', link: 'https://github.com/engelde', x: 8920 },
  { name: 'Hugging Face', link: 'https://huggingface.co', x: 8980 },
  { name: 'Anthropic', link: 'https://www.anthropic.com', x: 9100 },
]

const SkillsMobile = ({ xPos, xMin, xMax, offset }: SkillsMobileProps) => {
  return (
    <Box
      as={motion.div}
      zIndex={10}
      position={'fixed'}
      top={8}
      left={4}
      maxW={'calc(100vw - 2rem)'}
      minW={'calc(100vw - 2rem)'}
      py={3}
      ml={(offset - xPos > 0 ? offset - xPos : 0) + 'px'}
      visibility={xPos < 2000 ? 'hidden' : 'visible'}
      {...((xPos > xMin &&
        xPos < xMax && {
          initial: { opacity: 0, marginTop: -600 },
          animate: { opacity: 1, marginTop: 0 },
        }) || {
        initial: { opacity: 0, marginTop: -600 },
        animate: { opacity: 0, marginTop: -600 },
      })}
    >
      <Heading
        as={motion.div}
        size={'3xl'}
        color={'red.500'}
        pb={2}
        textShadow={'2px 2px rgba(0, 0, 0, 0.09)'}
      >
        <Code text={'<h1>'} />
        Skills
        <Code text={'</h1>'} />
      </Heading>

      <Text fontSize={'xl'} pb={4} textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}>
        <Code text={'<p>'} />
        A few favorite tools, languages, and frameworks.
        <Code text={'</p>'} />
      </Text>

      <Flex wrap={'wrap'} gap={3}>
        {skillset.map(
          (skill) =>
            xPos > skill.x && (
              <Link
                key={skill.name}
                href={skill.link}
                target={'_blank'}
                referrerPolicy={'no-referrer'}
                rel={'noopener'}
              >
                <Box
                  as={motion.span}
                  display={'inline-block'}
                  px={3}
                  py={1}
                  color={'white'}
                  bg={'black'}
                  border={'2px solid'}
                  borderColor={'white'}
                  fontSize={'2xl'}
                  lineHeight={1}
                  textShadow={'none'}
                >
                  {skill.name}
                </Box>
              </Link>
            )
        )}
      </Flex>
    </Box>
  )
}

export default SkillsMobile
