import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, BoxProps, Flex, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = BoxProps & {
  isLoading: boolean
  setIsLoading: (status: boolean) => void
}

const images = [
  '/_next/image?url=%2Fimages%2Fbox%2Fbox.0.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fbox%2Fbox.1.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fbox%2Fbox.2.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fbox%2Fbox.3.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fbox%2Fbox.4.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fbrick%2Fbrick.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fbush%2Fbush.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fclouds%2Fclouds.1.png&w=384&q=80',
  '/_next/image?url=%2Fimages%2Fclouds%2Fclouds.2.png&w=384&q=80',
  '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.1.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.2.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.3.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.4.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.5.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fcube%2Fcube.1.png&w=1080&q=80',
  '/_next/image?url=%2Fimages%2Fcube%2Fcube.2.png&w=3840&q=80',
  '/_next/image?url=%2Fimages%2Fcube%2Fcube.3.png&w=1920&q=80',
  '/_next/image?url=%2Fimages%2Fcube%2Fcube.4.png&w=1080&q=80',
  '/_next/image?url=%2Fimages%2Fdog%2Fdog.png&w=1920&q=80',
  '/_next/image?url=%2Fimages%2Ffamily%2Ffamily.png&w=1920&q=90',
  '/_next/image?url=%2Fimages%2Ffire%2Ffire.1.png&w=64&q=80',
  '/_next/image?url=%2Fimages%2Ffire%2Ffire.2.png&w=64&q=80',
  '/_next/image?url=%2Fimages%2Ffire%2Ffire.3.png&w=64&q=80',
  '/_next/image?url=%2Fimages%2Ffire%2Ffire.4.png&w=64&q=80',
  '/_next/image?url=%2Fmedia%2Ffireworks%2Ffireworks.webp&w=640&q=80',
  '/_next/image?url=%2Fimages%2Fgithub%2Fgithub.png&w=128&q=80',
  '/_next/image?url=%2Fimages%2Fgoomba%2Fgoomba.1.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fgoomba%2Fgoomba.2.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fground%2Fground.1.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fground%2Fground.2.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fground%2Fground.3.png&w=128&q=80',
  '/_next/image?url=%2Fimages%2Flinkedin%2Flinkedin.png&w=128&q=80',
  '/_next/image?url=%2Fimages%2Fmario%2Fmario.lg.1.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fmario%2Fmario.lg.2.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fmario%2Fmario.lg.jump.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fmario%2Fmario.sm.1.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fmario%2Fmario.sm.2.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fmario%2Fmario.sm.jump.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fme%2Fme.png&w=1920&q=90',
  '/_next/image?url=%2Fimages%2Fmushroom%2Fmushroom.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fpipe%2Fpipe.0.png&w=384&q=80',
  '/_next/image?url=%2Fimages%2Fpipe%2Fpipe.1.png&w=384&q=80',
  '/_next/image?url=%2Fimages%2Fplant%2Fplant.1.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fplant%2Fplant.2.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fplant%2Fplant.3.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fplant%2Fplant.4.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fplant%2Fplant.5.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fplant%2Fplant.6.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Frock%2Frock.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fsun%2Fsun.png&w=384&q=80',
  '/_next/image?url=%2Fimages%2Ftree%2Ftree.1.png&w=640&q=80',
  '/_next/image?url=%2Fimages%2Ftree%2Ftree.2.png&w=1920&q=80',
  '/_next/image?url=%2Fimages%2Ftree%2Ftree.3.png&w=1080&q=80',
  '/_next/image?url=%2Fimages%2Fturtle%2Fturtle.1.png&w=256&q=80',
  '/_next/image?url=%2Fimages%2Fturtle%2Fturtle.2.png&w=256&q=80',
]

const Preloader: FC<Props> = ({ isLoading, setIsLoading, ...rest }: Props) => {
  const [mobile] = useMediaQuery('(max-width: 36rem)')
  const [isPreloading, setIsPreloading] = useState(true)
  const [isInstructing, setIsInstructing] = useState(false)
  const [position, setPosition] = useState(1)
  const router = useRouter()

  // Preload images
  const preloadImages = async (files: string[]) => {
    await Promise.all(
      files.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve({ src, status: 'ok' })
          img.onerror = () => reject({ src, status: 'error' })
          img.src = src
        })
      }),
    )

    setTimeout(() => {
      setIsPreloading(false)
      setTimeout(() => {
        setPosition(2)
        setIsInstructing(true)
      }, 800)
    }, 1000)
  }

  // Start preloading
  useEffect(() => {
    if (isPreloading) {
      if (router.pathname != '/') {
        setIsPreloading(false)
        setIsLoading(false)
      } else {
        preloadImages(images)
      }
    }
  }, [isPreloading, setIsPreloading, setIsLoading, router])

  // Scroll to start
  const handleScroll = () => {
    setIsInstructing(false)

    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  return (
    <Box
      zIndex={'overlay'}
      position={'fixed'}
      top={0}
      left={0}
      width={'full'}
      height={'100vh'}
      overflowY={isInstructing ? 'scroll' : 'hidden'}
      onScroll={handleScroll}
      bg={'black'}
      className={
        styles.container + (!isLoading && ' animate__animated animate__slideOutDown') || ''
      }>
      <Flex
        w={'full'}
        height={isInstructing ? 'calc(100vh + 10px)' : 'full'}
        alignItems={'center'}
        justifyContent={'center'}>
        {(position == 1 && (
          <VStack
            spacing={2}
            className={(!isPreloading && 'animate__animated animate__backOutDown') || ''}>
            <Flex className={styles.preloader} />
            <Text fontSize={'2xl'} color={'cyan.500'}>
              <strong>Loading...</strong>
            </Text>
          </VStack>
        )) || (
          <VStack
            className={
              (isInstructing && 'animate__animated animate__backInUp') ||
              'animate__animated animate__backOutDown'
            }>
            <Flex
              w={'full'}
              className={'animate__animated animate__fadeInUpBig ' + styles.instructions}
              alignItems={'center'}
              justifyContent={'center'}>
              <VStack
                alignItems={'center'}
                justifyContent={'center'}
                p={1}
                spacing={0}
                className={'animate__animated animate__infinite animate__pulse'}>
                <Text
                  fontSize={mobile ? '2xl' : '4xl'}
                  color={'cyan.500'}
                  mb={3}
                  textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}>
                  <strong>Scroll down to start!</strong>
                </Text>
                <Text
                  fontSize={'4xl'}
                  color={'cyan.500'}
                  mb={3}
                  transform={'rotate(90deg)'}
                  textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}>
                  <strong>{'>'}</strong>
                </Text>
              </VStack>
            </Flex>
          </VStack>
        )}
      </Flex>
    </Box>
  )
}

export default Preloader
