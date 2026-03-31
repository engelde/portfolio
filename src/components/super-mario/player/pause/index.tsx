'use client'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useAudio } from '@/hooks/useAudio'

export type PauseProps = {
  length: number
  open: boolean
  setOpen: (status: boolean) => void
  setX: (status: number) => void
  setY: (status: number) => void
}

type MenuLink = {
  name: string
  color: string
  x: number
  y: number
}

const Pause = ({ length, open, setOpen, setX, setY }: PauseProps) => {
  const { audio, playAudio, setAudio } = useAudio()

  const links: MenuLink[] = [
    { name: 'Home()', color: 'cyan.500', x: 0, y: 64 },
    { name: 'About()', color: 'cyan.500', x: 3600, y: 128 },
    { name: 'Skills()', color: 'cyan.500', x: 9100, y: 64 },
    { name: 'Contact()', color: 'cyan.500', x: length, y: 64 },
  ]

  const handleOpen = () => {
    setOpen(true)
    playAudio('pause')
  }

  const handleClose = () => {
    setOpen(false)
    playAudio('stomp')
  }

  const handleLink = (x: number, y: number) => {
    if (window.scrollY !== x) {
      window.scrollTo({ top: x, behavior: 'instant' })
      setTimeout(() => {
        setX(x)
        setY(y)
      }, 100)
    }
    setOpen(false)
    playAudio('inventory')
  }

  const handleAudioLevel = (val: number) => {
    setAudio(val)
  }

  return (
    <>
      <Flex pr={{ base: 2, lg: 2 }} pl={{ base: 2, lg: 2 }}>
        <HStack>
          <Button
            as={motion.div}
            variant={'link'}
            zIndex={15}
            position={'fixed'}
            top={4}
            left={4}
            p={1}
            size={'sm'}
            color={'white'}
            cursor={'pointer'}
            title={'Pause'}
            aria-label={'open menu'}
            onClick={handleOpen}
            _active={{ color: 'cyan.500', borderColor: 'cyan.500' }}
            _hover={{ color: 'cyan.500', borderColor: 'cyan.500' }}
            initial={{ translateY: '-175%' }}
            animate={{ translateY: 0, transition: { delay: 1 } }}
            whileHover={{ color: '#76E4F7', scale: 1.25 }}
            textDecoration={'none !important'}
            border={'2px solid white'}
          >
            PAUSE
          </Button>
        </HStack>
      </Flex>

      <Drawer isOpen={open} placement={'left'} size={'lg'} onClose={handleClose}>
        <DrawerOverlay bg={'blackAlpha.800'} />
        <DrawerContent color={'white'} bg={'blackAlpha.900'}>
          <DrawerCloseButton
            as={motion.div}
            zIndex={15}
            _active={{ color: 'cyan.300' }}
            cursor={'pointer'}
            whileHover={{ color: '#76E4F7', scale: 1.25 }}
          />
          <DrawerBody>
            <Flex h={'80vh'} w={'full'} alignItems={'center'} justifyContent={'center'}>
              <VStack spacing={8}>
                <Heading fontSize={'4xl'} color={'white'}>
                  PAUSED
                </Heading>

                <VStack spacing={0} alignItems={'center'} justifyContent={'center'} mb={4}>
                  {links.map((link, x) => (
                    <Text
                      key={x}
                      fontSize={'2xl'}
                      textAlign={'center'}
                      _hover={{ cursor: 'pointer', color: link.color }}
                      onClick={() => handleLink(link.x, link.y)}
                    >
                      {link.name}
                    </Text>
                  ))}
                </VStack>

                <VStack spacing={2} mb={4} alignItems={'center'} justifyContent={'center'}>
                  <Text fontSize={'2xl'} textAlign={'center'}>
                    Audio
                  </Text>

                  <Slider
                    aria-label={'audio-slider'}
                    colorScheme={'red'}
                    w={100}
                    min={0}
                    max={100}
                    defaultValue={audio}
                    onChange={(val) => handleAudioLevel(val)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
              </VStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Pause
