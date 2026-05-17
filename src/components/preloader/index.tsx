'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Box, Flex, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import Wordmark from '@/components/wordmark'

import styles from './styles.module.css'

export type PreloaderProps = {
  isLoading: boolean
  setIsLoading: (status: boolean) => void
}

type PreloadTypes = {
  images: string[]
}

const preloadImage = (src: string) =>
  new Promise<{ src: string; status: 'ok' }>((resolve, reject) => {
    const img = new Image()
    img.onload = async () => {
      try {
        if ('decode' in img) {
          await img.decode()
        }
        resolve({ src, status: 'ok' })
      } catch {
        resolve({ src, status: 'ok' })
      }
    }
    img.onerror = () => reject({ src, status: 'error' })
    img.src = src
  })

const preloadImages = async (images: string[], batchSize = 8) => {
  for (let i = 0; i < images.length; i += batchSize) {
    await Promise.allSettled(images.slice(i, i + batchSize).map(preloadImage))
  }
}

const Preloader = ({ isLoading, setIsLoading }: PreloaderProps) => {
  const [mobile] = useMediaQuery('(max-width: 36rem)')
  const [isPreloading, setIsPreloading] = useState(true)
  const [isInstructing, setIsInstructing] = useState(false)
  const [position, setPosition] = useState(1)
  const router = useRouter()
  const pathname = usePathname()

  // Preload
  const preload = async () => {
    const files: PreloadTypes = {
      images: [
        '/images/1up/1up.png',
        '/images/box/box.sprite.png',
        '/images/brick/brick.sprite.png',
        '/images/bush/bush.png',
        '/images/castle/castle.png',
        '/images/clear/clear.png',
        '/images/cloud/cloud.1.png',
        '/images/cloud/cloud.2.png',
        '/images/cloud/cloud.3.png',
        '/images/coin/coin.sprite.png',
        '/images/cube/cube.1.png',
        '/images/cube/cube.2.png',
        '/images/cube/cube.3.png',
        '/images/cube/cube.4.png',
        '/images/cube/cube.5.png',
        '/images/dog/dog.png',
        '/images/family/family.png',
        '/images/fire/fire.sprite.png',
        '/images/github/github.png',
        '/images/goomba/goomba.sprite.png',
        '/images/ground/ground.1.png',
        '/images/ground/ground.2.png',
        '/images/ground/ground.3.png',
        '/images/leaf/leaf.png',
        '/images/linkedin/linkedin.png',
        '/images/mario/mario.raccoon.sprite.png',
        '/images/mario/mario.regular.sprite.png',
        '/images/mario/mario.super.sprite.png',
        '/images/me/me.png',
        '/images/mushroom/mushroom.png',
        '/images/orcid/orcid.png',
        '/images/pipe/pipe.0.png',
        '/images/pipe/pipe.1.png',
        '/images/plant/plant.sprite.png',
        '/images/rock/rock.png',
        '/images/sun/sun.png',
        '/images/tree/tree.1.png',
        '/images/tree/tree.2.png',
        '/images/tree/tree.3.png',
        '/images/turtle/turtle.sprite.png',
        '/images/wordmark/wordmark.svg',
      ],
    }

    // Images
    await preloadImages(files.images)

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
      if (pathname !== '/') {
        setIsPreloading(false)
        setIsLoading(false)
      } else {
        void preload()
      }
    }
  }, [isPreloading, pathname, setIsPreloading, setIsLoading, router])

  // Scroll to start
  const handleStart = useCallback(() => {
    if (!isInstructing) return

    setIsInstructing(false)

    setTimeout(() => {
      setIsLoading(false)
    }, 900)
  }, [isInstructing, setIsLoading])

  const handleScroll = () => {
    handleStart()
  }

  useEffect(() => {
    if (!isLoading || !isInstructing) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'ArrowDown') {
        event.preventDefault()
        handleStart()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleStart, isInstructing, isLoading])

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
      })}
    >
      <Flex
        w={'full'}
        height={isInstructing ? 'calc(100vh + 10px)' : 'full'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {(position == 1 && (
          <VStack
            as={motion.div}
            spacing={2}
            {...(!isPreloading && {
              initial: { translateY: 0 },
              animate: { translateY: 2000, transition: { duration: 0.9 } },
            })}
          >
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
            })}
          >
            <Flex
              as={motion.div}
              w={'full'}
              alignItems={'center'}
              justifyContent={'center'}
              initial={{ translateY: 2000 }}
              animate={{ translateY: 0, transition: { duration: 0.9 } }}
            >
              <VStack spacing={16}>
                <Wordmark textAlign={'center'} />

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
                  }}
                >
                  <Text
                    fontSize={mobile ? '2xl' : '4xl'}
                    color={'cyan.500'}
                    mb={3}
                    textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
                  >
                    <strong>Scroll to start!</strong>
                  </Text>
                  <Text
                    fontSize={'4xl'}
                    color={'cyan.500'}
                    mb={3}
                    transform={'rotate(90deg)'}
                    textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
                  >
                    <strong>{'>'}</strong>
                  </Text>
                </VStack>
              </VStack>
            </Flex>
          </VStack>
        )}
      </Flex>
    </Box>
  )
}

export default Preloader
