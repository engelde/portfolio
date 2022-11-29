import { FC } from 'react'
import { Box, BoxProps, Heading, HStack, Icon, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import {
  SiApollographql,
  SiAmazonaws,
  SiDocker,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiLinux,
  SiNextdotjs,
  SiMongodb,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si'
import Code from '@/components/Code'

type Props = BoxProps & {
  xPos: number
  offset: number
}

const skillset = [
  {
    name: 'TypeScript',
    icon: SiTypescript,
    color: 'blue.300',
    x: 7360,
  },
  {
    name: 'React',
    icon: SiReact,
    color: 'teal.300',
    x: 7480,
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    color: 'gray.900',
    x: 7600,
  },
  {
    name: 'GraphQL',
    icon: SiGraphql,
    color: 'pink.400',
    x: 7720,
  },
  {
    name: 'Apollo',
    icon: SiApollographql,
    color: 'purple.600',
    x: 7840,
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    color: 'green.600',
    x: 7960,
  },
  {
    name: 'Vue',
    icon: SiVuedotjs,
    color: 'green.400',
    x: 8080,
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    color: 'yellow.400',
    x: 8200,
  },
  {
    name: 'Python',
    icon: SiPython,
    color: 'blue.500',
    x: 8320,
  },
  {
    name: 'PHP',
    icon: SiPhp,
    color: 'purple.400',
    x: 8440,
  },
  {
    name: 'AWS',
    icon: SiAmazonaws,
    color: 'orange.400',
    x: 8560,
  },
  {
    name: 'Docker',
    icon: SiDocker,
    color: 'blue.500',
    x: 8680,
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    color: 'green.400',
    x: 8800,
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    color: 'blue.400',
    x: 8920,
  },
  {
    name: 'Git',
    icon: SiGit,
    color: 'orange.400',
    x: 9040,
  },
  {
    name: 'Linux',
    icon: SiLinux,
    color: 'gray.300',
    x: 9160,
  },
]

const Skills: FC<Props> = ({ xPos, offset, ...rest }: Props) => {
  const [mobile] = useMediaQuery('(max-width: 48rem)')

  return (
    <Box
      zIndex={999}
      position={'fixed'}
      top={8}
      left={6}
      ml={offset + 'px'}
      py={3}
      maxW={'calc(100vw - 2rem)'}
      className={'animate__animated animate__fadeInDown'}
      {...rest}>
      <Heading
        size={'4xl'}
        color={'red.500'}
        pb={2}
        textShadow={'2px 2px rgba(0, 0, 0, 0.14)'}
        className={'animate__animated animate__fadeInDown'}>
        <Code text={'<h1>'} />
        Skills
        <Code text={'</h1>'} />
      </Heading>

      <Text
        fontSize={'xl'}
        pb={6}
        textShadow={'1px 1px rgba(0, 0, 0, 0.14)'}
        className={'animate__animated animate__slow animate__fadeInRightBig'}>
        <Code text={'<p>'} />
        {
          "I'm always exploring new things! Here are a few of my favorite languages, frameworks, and tools."
        }
        <Code text={'</p>'} />
      </Text>

      <HStack mb={2} spacing={mobile ? 2 : 4} alignItems={'top'} justifyContent={'flex-start'}>
        <VStack pl={mobile ? 0 : 2} pr={mobile ? 0 : 2} alignItems={'top'} spacing={mobile ? 2 : 8}>
          <Heading size={'2xl'} width={'full'} minWidth={300} maxWidth={920}>
            {skillset.map((skill, x) => (
              <Icon
                key={x}
                as={skill.icon}
                title={skill.name}
                height={mobile ? 12 : 20}
                width={mobile ? 12 : 20}
                display={xPos > skill.x && xPos < 9800 ? 'inline' : 'none'}
                color={'white'}
                _hover={{
                  cursor: 'pointer',
                  color: skill.color,
                  transform: 'scale(1.25)',
                  className: 'animate__animated animate__tada',
                }}
                m={mobile ? 3 : 4}
                className={'animate__animated animate__fadeIn'}
              />
            ))}
          </Heading>
        </VStack>
      </HStack>
    </Box>
  )
}

export default Skills
