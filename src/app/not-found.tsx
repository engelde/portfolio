'use client'

import NextLink from 'next/link'
import { Flex, Text, useMediaQuery, VStack } from '@chakra-ui/react'

import Code from '@/components/code'
import Layout from '@/components/layout'
import { MotionBox, MotionFlex, MotionHeading, MotionText } from '@/components/motion'
import Turtle from '@/components/super-mario/foreground/turtle'

export default function NotFound() {
  const [mobile] = useMediaQuery('(max-width: 32rem)')

  return (
    <Layout title={'404'} bg={'black'}>
      <Flex h={'80vh'} w={'full'} alignItems={'center'} justifyContent={'center'}>
        <VStack spacing={0}>
          <Flex>
            <MotionBox
              width={500}
              mb={8}
              initial={{ opacity: 0, translateY: -2000 }}
              animate={{ opacity: 1, translateY: 0, transition: { duration: 0.9 } }}
            >
              <Turtle relative={true} x={400} y={0} offset={400} />
            </MotionBox>
          </Flex>

          <MotionHeading
            as="div"
            pb={4}
            size={'4xl'}
            color={'red.500'}
            textShadow={'2px 2px rgba(0, 0, 0, 0.09)'}
            initial={{ opacity: 0, translateY: -2000 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.9 } }}
          >
            {'404('}
            <Text
              as={'span'}
              display={mobile ? 'none' : 'inline'}
              fontSize={'60px'}
              color={'orange.500'}
            >
              {"'NOT FOUND'"}
            </Text>
            {')'}
          </MotionHeading>

          <MotionText
            as="div"
            align={'center'}
            pb={12}
            initial={{ opacity: 0, translateX: -2000 }}
            animate={{ opacity: 1, translateX: 0, transition: { duration: 0.9 } }}
          >
            <Code text={'// "Not all those who wander are lost." - J.R.R. Tolkien'} />
          </MotionText>

          <MotionFlex
            initial={{ opacity: 0, translateY: 2000 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.9 } }}
          >
            <NextLink href={'/'} passHref>
              <MotionHeading
                as="div"
                size={{ base: '2xl', md: '4xl' }}
                textAlign={'center'}
                cursor={'pointer'}
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.06, 1],
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
                }}
                _hover={{ color: 'cyan.500' }}
              >
                {'> restart'}
              </MotionHeading>
            </NextLink>
          </MotionFlex>
        </VStack>
      </Flex>
    </Layout>
  )
}
