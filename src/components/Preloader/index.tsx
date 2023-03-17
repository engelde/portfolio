import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import styles from './styles.module.css'

export type PreloaderProps = {
  isLoading: boolean
  setIsLoading: (status: boolean) => void
}

type PreloadTypes = {
  audio: string[]
  images: string[]
}

const Preloader: FC<PreloaderProps> = ({ isLoading, setIsLoading }: PreloaderProps) => {
  const [mobile] = useMediaQuery('(max-width: 36rem)')
  const [isPreloading, setIsPreloading] = useState(true)
  const [isInstructing, setIsInstructing] = useState(false)
  const [position, setPosition] = useState(1)
  const router = useRouter()

  // Preload
  const preload = async () => {
    const files: PreloadTypes = {
      audio: [
        '/audio/1up/1up.mp3',
        '/audio/box/box.mp3',
        '/audio/brick/brick.mp3',
        '/audio/clear/clear.mp3',
        '/audio/coin/coin.mp3',
        '/audio/death/death.mp3',
        '/audio/enter/enter.mp3',
        '/audio/fire/fire.mp3',
        '/audio/gameOver/gameOver.mp3',
        '/audio/hurry/hurry.mp3',
        '/audio/inventory/inventory.mp3',
        '/audio/jump/jump.mp3',
        '/audio/kick/kick.mp3',
        '/audio/mushroom/mushroom.mp3',
        '/audio/pause/pause.mp3',
        '/audio/pipe/pipe.mp3',
        '/audio/powerUp/powerUp.mp3',
        '/audio/stomp/stomp.mp3',
      ],
      images: [
        '/_next/image?url=%2Fimages%2Fbox%2Fbox.0.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fbox%2Fbox.1.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fbox%2Fbox.2.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fbox%2Fbox.3.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fbox%2Fbox.4.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fbrick%2Fbrick.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fbush%2Fbush.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fclouds%2Fclouds.1.png&w=384&q=75',
        '/_next/image?url=%2Fimages%2Fclouds%2Fclouds.2.png&w=384&q=75',
        '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.1.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.2.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.3.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.4.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fcoin%2Fcoin.5.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fcube%2Fcube.1.png&w=1080&q=75',
        '/_next/image?url=%2Fimages%2Fcube%2Fcube.2.png&w=3840&q=75',
        '/_next/image?url=%2Fimages%2Fcube%2Fcube.3.png&w=1920&q=75',
        '/_next/image?url=%2Fimages%2Fcube%2Fcube.4.png&w=1080&q=75',
        '/_next/image?url=%2Fimages%2Fdog%2Fdog.png&w=1920&q=75',
        '/_next/image?url=%2Fimages%2Ffamily%2Ffamily.png&w=1920&q=75',
        '/_next/image?url=%2Fimages%2Ffire%2Ffire.1.png&w=64&q=75',
        '/_next/image?url=%2Fimages%2Ffire%2Ffire.2.png&w=64&q=75',
        '/_next/image?url=%2Fimages%2Ffire%2Ffire.3.png&w=64&q=75',
        '/_next/image?url=%2Fimages%2Ffire%2Ffire.4.png&w=64&q=75',
        '/_next/image?url=%2Fmedia%2Ffireworks%2Ffireworks.webp&w=640&q=75',
        '/_next/image?url=%2Fimages%2Fgithub%2Fgithub.png&w=128&q=75',
        '/_next/image?url=%2Fimages%2Fgoomba%2Fgoomba.1.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fgoomba%2Fgoomba.2.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fground%2Fground.1.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fground%2Fground.2.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fground%2Fground.3.png&w=128&q=75',
        '/_next/image?url=%2Fimages%2Flinkedin%2Flinkedin.png&w=128&q=75',
        '/_next/image?url=%2Fimages%2Fmario%2Fmario.lg.1.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fmario%2Fmario.lg.2.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fmario%2Fmario.lg.jump.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fmario%2Fmario.sm.1.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fmario%2Fmario.sm.2.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fmario%2Fmario.sm.jump.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fme%2Fme.png&w=1920&q=75',
        '/_next/image?url=%2Fimages%2Fmushroom%2Fmushroom.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fpipe%2Fpipe.0.png&w=384&q=75',
        '/_next/image?url=%2Fimages%2Fpipe%2Fpipe.1.png&w=384&q=75',
        '/_next/image?url=%2Fimages%2Fplant%2Fplant.1.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fplant%2Fplant.2.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fplant%2Fplant.3.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fplant%2Fplant.4.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fplant%2Fplant.5.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fplant%2Fplant.6.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Frock%2Frock.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fsun%2Fsun.png&w=384&q=75',
        '/_next/image?url=%2Fimages%2Ftree%2Ftree.1.png&w=640&q=75',
        '/_next/image?url=%2Fimages%2Ftree%2Ftree.2.png&w=1920&q=75',
        '/_next/image?url=%2Fimages%2Ftree%2Ftree.3.png&w=1080&q=75',
        '/_next/image?url=%2Fimages%2Fturtle%2Fturtle.1.png&w=256&q=75',
        '/_next/image?url=%2Fimages%2Fturtle%2Fturtle.2.png&w=256&q=75',
      ],
    }

    await Promise.all(
      files.images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve({ src, status: 'ok' })
          img.onerror = () => reject({ src, status: 'error' })
          img.src = src
        })
      }),
    )

    await Promise.all(
      files.audio.map((src) => {
        return new Promise((resolve, reject) => {
          const audio = new Audio()
          audio.oncanplaythrough = () => resolve({ src, status: 'ok' })
          audio.onerror = () => reject({ src, status: 'error' })
          audio.src = src
          audio.autoplay = false
          audio.volume = 0
          audio.preload
        })
      }),
    )

    setTimeout(() => {
      setIsPreloading(false)
      setTimeout(() => {
        setPosition(2)
        setIsInstructing(true)
      }, 600)
    }, 900)
  }

  // Start preloading
  useEffect(() => {
    if (isPreloading) {
      if (router.pathname !== '/') {
        setIsPreloading(false)
        setIsLoading(false)
      } else {
        preload()
      }
    }
  }, [isPreloading, setIsPreloading, setIsLoading, router])

  // Scroll to start
  const handleScroll = () => {
    setIsInstructing(false)

    setTimeout(() => {
      setIsLoading(false)
    }, 900)
  }

  return (
    <Box
      as={motion.div}
      zIndex={'overlay'}
      position={'fixed'}
      top={0}
      left={0}
      width={'full'}
      height={'100vh'}
      overflowY={isInstructing ? 'scroll' : 'hidden'}
      onScroll={handleScroll}
      bg={'black'}
      className={styles.container}
      {...(!isLoading && {
        initial: { translateY: 0 },
        animate: { translateY: 3000, transition: { duration: 0.8 } },
      })}>
      <Flex
        w={'full'}
        height={isInstructing ? 'calc(100vh + 10px)' : 'full'}
        alignItems={'center'}
        justifyContent={'center'}>
        {(position == 1 && (
          <VStack
            as={motion.div}
            spacing={2}
            {...(!isPreloading && {
              initial: { translateY: 0 },
              animate: { translateY: 2000, transition: { duration: 0.9 } },
            })}>
            <Flex w={'10px'} h={'10px'} mb={'48px'} className={styles.preloader} />
            <Text fontSize={'2xl'} color={'cyan.500'}>
              <strong>Loading...</strong>
            </Text>
          </VStack>
        )) || (
          <VStack
            as={motion.div}
            {...((!isInstructing && {
              initial: { translateY: 0 },
              animate: { translateY: 2000, transition: { duration: 0.9 } },
            }) || {
              initial: { translateY: 2000 },
              animate: { translateY: 0, transition: { duration: 0.9 } },
            })}>
            <Flex
              as={motion.div}
              w={'full'}
              alignItems={'center'}
              justifyContent={'center'}
              initial={{ translateY: 2000 }}
              animate={{ translateY: 0, transition: { duration: 0.9 } }}>
              <VStack
                as={motion.div}
                spacing={0}
                alignItems={'center'}
                justifyContent={'center'}
                p={1}
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
