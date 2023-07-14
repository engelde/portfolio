import type { NextPage } from 'next'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, Button, Flex, Heading, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Code from '@/components/Code'
import Layout from '@/components/Layout'

const Custom404: NextPage = () => {
  const [mobile] = useMediaQuery('(max-width: 32rem)')

  return (
    <Layout title={'404'} bg={'black'}>
      <Flex h={'80vh'} w={'full'} alignItems={'center'} justifyContent={'center'}>
        <VStack spacing={0}>
          <Flex>
            <Box
              as={motion.div}
              w={'400px'}
              h={'230px'}
              maxW={'90vw'}
              mb={8}
              overflow={'hidden'}
              initial={{ opacity: 0, translateY: -2000 }}
              animate={{ opacity: 1, translateY: 0, transition: { duration: 0.9 } }}>
              <NextImage
                alt={'forbidden'}
                src={'/media/gandalf/gandalf.webp'}
                width={400}
                height={230}
                draggable={false}
                priority
              />
            </Box>
          </Flex>

          <Heading
            as={motion.div}
            pb={4}
            size={'4xl'}
            color={'red.500'}
            textShadow={'2px 2px rgba(0, 0, 0, 0.09)'}
            initial={{ opacity: 0, translateY: -2000 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.9 } }}>
            <Code text={'<h1>'} />
            {'404('}
            <Text
              as={'span'}
              display={mobile ? 'none' : 'inline'}
              fontSize={'60px'}
              color={'orange.500'}>
              {"'NOT FOUND'"}
            </Text>
            {')'}
            <Code text={'</h1>'} />
          </Heading>

          <Text
            as={motion.div}
            align={'center'}
            pb={12}
            initial={{ opacity: 0, translateX: -2000 }}
            animate={{ opacity: 1, translateX: 0, transition: { duration: 0.9 } }}>
            <Code text={'// "Not all those who wander are lost." - J.R.R. Tolkien'} />
          </Text>

          <Flex
            as={motion.div}
            initial={{ opacity: 0, translateY: 2000 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.9 } }}>
            <NextLink href={'/'} passHref>
              <Button
                as={motion.div}
                variant={'outline'}
                colorScheme={'white'}
                size={'lg'}
                _hover={{
                  bg: 'red.500',
                  color: 'white',
                  borderColor: 'red.500',
                }}
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
                {'> Restart'}
              </Button>
            </NextLink>
          </Flex>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default Custom404
