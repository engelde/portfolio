import { FC } from 'react'
import {
  Box,
  BoxProps,
  Heading,
  HStack,
  Icon,
  Text,
  Tooltip,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
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
import styles from './styles.module.css'

type Props = BoxProps & {
  xPos: number
  offset: number
}

const settings = [
  {
    name: 'Typescript',
    icon: SiTypescript,
    color: 'blue.300',
    x: 6720,
  },
  {
    name: 'React.js',
    icon: SiReact,
    color: 'teal.300',
    x: 6800,
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    color: 'gray.200',
    x: 6880,
  },
  {
    name: 'Graphql',
    icon: SiGraphql,
    color: 'pink.400',
    x: 6960,
  },
  {
    name: 'Apollo',
    icon: SiApollographql,
    color: 'purple.600',
    x: 7040,
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    color: 'green.500',
    x: 7120,
  },
  {
    name: 'Vue',
    icon: SiVuedotjs,
    color: 'green.400',
    x: 7200,
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    color: 'yellow.400',
    x: 7280,
  },
  {
    name: 'Python',
    icon: SiPython,
    color: 'blue.500',
    x: 7360,
  },
  {
    name: 'PHP',
    icon: SiPhp,
    color: 'purple.400',
    x: 7440,
  },
  {
    name: 'AWS',
    icon: SiAmazonaws,
    color: 'orange.400',
    x: 7520,
  },
  {
    name: 'Docker',
    icon: SiDocker,
    color: 'blue.500',
    x: 7760,
  },
  {
    name: 'Mongo',
    icon: SiMongodb,
    color: 'green.400',
    x: 7600,
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    color: 'blue.400',
    x: 7680,
  },
  {
    name: 'Git',
    icon: SiGit,
    color: 'orange.400',
    x: 7840,
  },
  {
    name: 'Linux',
    icon: SiLinux,
    color: 'gray.300',
    x: 7920,
  },
]

const Skills: FC<Props> = ({ xPos, offset, ...rest }: Props) => {
  const [mobile] = useMediaQuery('(max-width: 48rem)')

  return (
    <Box
      p={2}
      zIndex={999}
      position={'fixed'}
      top={16}
      left={6}
      ml={offset + 'px'}
      className={'animate__animated animate__fadeInDown'}
      {...rest}>
      <Heading
        size={'4xl'}
        color={'red.500'}
        pb={2}
        textShadow={'md'}
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
        {"I'm always exploring new things!"}
        <Code text={'</p>'} />
      </Text>

      <HStack mb={2} spacing={4} alignItems={'top'} justifyContent={'flex-start'}>
        <VStack pl={2} pr={2} alignItems={'top'} spacing={8}>
          <Heading size={'2xl'} minWidth={320} maxWidth={mobile ? 320 : 920} width={'full'}>
            {settings.map((skill, x) => (
              <Icon
                key={x}
                as={skill.icon}
                height={mobile ? 12 : 20}
                width={mobile ? 12 : 20}
                display={xPos > skill.x && xPos < 9000 ? 'inline' : 'none'}
                color={'white'}
                _hover={{
                  cursor: 'pointer',
                  color: skill.color,
                  transform: 'scale(1.25)',
                  className: 'animate__animated animate__tada',
                }}
                m={4}
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
