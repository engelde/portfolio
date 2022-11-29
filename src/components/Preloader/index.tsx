import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, BoxProps, Flex, Icon, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import styles from './styles.module.css'

type Props = BoxProps & {
  isLoading: boolean
  setIsLoading: (status: boolean) => void
}

const images = [
  '/images/box/box.0.png',
  '/images/box/box.1.png',
  '/images/box/box.2.png',
  '/images/box/box.3.png',
  '/images/box/box.4.png',
  '/images/brick/brick.png',
  '/images/bush/bush.png',
  '/images/clouds/clouds.1.png',
  '/images/clouds/clouds.2.png',
  '/images/coin/coin.1.png',
  '/images/coin/coin.2.png',
  '/images/coin/coin.3.png',
  '/images/coin/coin.4.png',
  '/images/coin/coin.5.png',
  '/images/cube/cube.1.png',
  '/images/cube/cube.2.png',
  '/images/cube/cube.3.png',
  '/images/cube/cube.4.png',
  '/images/dog/dog.png',
  '/images/family/family.png',
  '/images/fire/fire.1.png',
  '/images/fire/fire.2.png',
  '/images/fire/fire.3.png',
  '/images/fire/fire.4.png',
  '/images/github/github.png',
  '/images/goomba/goomba.1.png',
  '/images/goomba/goomba.2.png',
  '/images/goomba/goomba.3.png',
  '/images/ground/ground.1.png',
  '/images/ground/ground.2.png',
  '/images/ground/ground.3.png',
  '/images/linkedin/linkedin.png',
  '/images/mario/mario.lg.1.png',
  '/images/mario/mario.lg.2.png',
  '/images/mario/mario.lg.3.png',
  '/images/mario/mario.lg.4.png',
  '/images/mario/mario.lg.jump.png',
  '/images/mario/mario.sm.1.png',
  '/images/mario/mario.sm.2.png',
  '/images/mario/mario.sm.jump.png',
  '/images/me/me.png',
  '/images/mushroom/mushroom.png',
  '/images/pipe/pipe.0.png',
  '/images/pipe/pipe.1.png',
  '/images/plant/plant.1.png',
  '/images/plant/plant.2.png',
  '/images/plant/plant.3.png',
  '/images/plant/plant.4.png',
  '/images/plant/plant.5.png',
  '/images/plant/plant.6.png',
  '/images/rock/rock.png',
  '/images/sun/sun.png',
  '/images/tree/tree.1.png',
  '/images/tree/tree.2.png',
  '/images/tree/tree.3.png',
  '/images/turtle/turtle.1.png',
  '/images/turtle/turtle.2.png',
  '/images/turtle/turtle.3.png',
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
          <VStack className={(!isPreloading && 'animate__animated animate__backOutDown') || ''}>
            <Flex className={styles.preloader} />
            <Text fontSize={'2xl'} color={'white'}>
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
                <Icon
                  as={FiChevronDown}
                  height={mobile ? 12 : 16}
                  width={mobile ? 12 : 16}
                  color={'white'}
                  textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
                />
              </VStack>
            </Flex>
          </VStack>
        )}
      </Flex>
    </Box>
  )
}

export default Preloader
