import type { NextPage } from 'next'
import NextLink from 'next/link'
import { Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Code from '@/components/Code'
import Layout from '@/components/Layout'

const Custom404: NextPage = () => {
  return (
    <Layout title={'Not Found'} bg={'red.500'}>
      <VStack my={'auto'} h={'full'}>
        <Flex my={'auto'} pt={10} alignItems={'center'} justifyContent={'center'}>
          <Image
            src={'/media/pass/pass.webp'}
            height={'200px'}
            width={'347px'}
            alt={'Me'}
            mb={4}
            border={4}
            borderStyle={'solid'}
            borderColor={'black'}
            rounded={'lg'}
            boxShadow={'2px 2px rgba(0,0,0,.2)'}
            className={'animate__animated animate__infinite animate__slow animate__pulse'}
          />
        </Flex>

        <Heading
          size={'4xl'}
          color={'yellow.500'}
          pb={4}
          className={'animate__animated animate__fadeInDown'}>
          <Code text={'<h1>'} />
          {'404()'}
          <Code text={'</h1>'} />
        </Heading>
        {/* <Text
          fontSize={'xl'}
          pb={4}
          maxWidth={'lg'}
          className={'animate__animated animate__fadeIn'}>
          <Code text={'<p>'} />
          {
            "\"It's a dangerous business, Frodo, going out your door. You step onto the road, and if you don't keep your feet, there's no knowing where you might be swept off to.\""
          }
          <Code text={'</p>'} />
        </Text> */}
        <Text className={'animate__animated animate__fadeInLeft'} pb={8}>
          <Code text={'// "Not all those who wander are lost." - J.R.R. Tolkien'} />
        </Text>
        <Flex className={'animate__animated animate__fadeInUp'}>
          <NextLink href={'/'} passHref>
            <Button
              variant={'outline'}
              colorScheme={'white'}
              size={'lg'}
              _hover={{
                bg: 'black',
                color: 'white',
                borderColor: 'black',
              }}
              className={'animate__animated animate__infinite animate__pulse'}>
              Take Me Home
            </Button>
          </NextLink>
        </Flex>
      </VStack>
    </Layout>
  )
}

export default Custom404
