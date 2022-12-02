import type { NextPage } from 'next'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { Box, Button, Flex, Heading, Text, useMediaQuery, VStack } from '@chakra-ui/react'
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
              height={'230px'}
              width={'400px'}
              maxW={'90vw'}
              mb={8}
              overflow={'hidden'}
              className={'animate__animated animate__fadeInDown'}>
              <NextImage
                alt={'You Shall Not Pass!'}
                src={'/media/gandalf/gandalf.webp'}
                layout={'fill'}
                objectFit={'contain'}
                quality={80}
                priority
              />
            </Box>
          </Flex>

          <Heading
            size={'4xl'}
            color={'red.500'}
            pb={4}
            textShadow={'2px 2px rgba(0, 0, 0, 0.09)'}
            className={'animate__animated animate__fadeInDown'}>
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

          <Text align={'center'} className={'animate__animated animate__fadeInLeft'} pb={12}>
            <Code text={'// "Not all those who wander are lost." - J.R.R. Tolkien'} />
          </Text>

          <Flex className={'animate__animated animate__fadeInUp'}>
            <NextLink href={'/'} passHref>
              <Button
                variant={'outline'}
                colorScheme={'white'}
                size={'lg'}
                _hover={{
                  bg: 'red.500',
                  color: 'white',
                  borderColor: 'red.500',
                }}
                className={'animate__animated animate__infinite animate__slow animate__pulse'}>
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
