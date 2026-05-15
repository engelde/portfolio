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
  useEventListener,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import Wordmark from '@/components/wordmark'
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

  useEventListener(typeof window !== 'undefined' ? window : null, 'keydown', (event) => {
    if (open && event.code === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      handleClose()
    }
  })

  return (
    <>
      <Flex pr={{ base: 2, lg: 2 }} pl={{ base: 2, lg: 2 }}>
        <HStack>
          <Button
            as={motion.p}
            title={'Pause'}
            aria-label={'open menu'}
            variant={'link'}
            zIndex={15}
            position={'fixed'}
            top={4}
            left={4}
            py={1.5}
            px={2}
            size={'sm'}
            color={'white'}
            background={'black'}
            borderRadius={0}
            cursor={'pointer'}
            fontSize={'14px'}
            letterSpacing={'1px'}
            textDecoration={'none !important'}
            textTransform={'uppercase'}
            opacity={0.9}
            _active={{ opacity: 1, color: 'cyan.500' }}
            _hover={{ opacity: 1, color: 'cyan.500' }}
            initial={{ translateY: '-175%' }}
            animate={{ translateY: 0, transition: { delay: 1 } }}
            whileHover={{ color: '#76E4F7', opacity: 1 }}
            onClick={handleOpen}
          >
            PAUSE
          </Button>
        </HStack>
      </Flex>

      <Drawer isOpen={open} placement={'left'} size={'lg'} onClose={handleClose}>
        <DrawerOverlay bg={'blackAlpha.800'} />
        <DrawerContent
          color={'white'}
          bg={'blackAlpha.900'}
          overflow={'visible'}
          _after={{
            background:
              'linear-gradient(45deg, #000 16px, transparent 0), linear-gradient(0deg, #000 0px, transparent 0), linear-gradient(135deg, #000 16px, transparent 0)',
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'right top',
            backgroundSize: '32px 32px',
            content: '""',
            display: 'block',
            position: 'absolute',
            right: '-26px',
            bottom: 0,
            width: '32px',
            height: '100%',
            opacity: 0.9,
          }}
        >
          <DrawerCloseButton
            as={motion.div}
            zIndex={15}
            _active={{ color: 'cyan.300' }}
            _hover={{ color: 'cyan.300' }}
            cursor={'pointer'}
            whileHover={{ color: '#76E4F7', scale: 1.25 }}
            fontFamily={'VT323'}
            fontSize={'36px'}
            transformOrigin={'center'}
            initial={{ scaleY: 0.55 }}
          >
            X
          </DrawerCloseButton>
          <DrawerBody>
            <Flex h={'90vh'} w={'full'} alignItems={'center'} justifyContent={'center'}>
              <VStack spacing={12}>
                <VStack spacing={8} alignItems={'center'} justifyContent={'center'}>
                  <Wordmark textAlign={'center'} fontSize={'5px'} />

                  <Heading fontSize={'4xl'} color={'white'}>
                    PAUSED
                  </Heading>
                </VStack>

                <VStack spacing={0} alignItems={'center'} justifyContent={'center'}>
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

                <VStack spacing={2} alignItems={'center'} justifyContent={'center'}>
                  <Text fontSize={'2xl'} textAlign={'center'}>
                    Audio
                  </Text>

                  <Slider
                    aria-label={'audio-slider'}
                    colorScheme={'cyan'}
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
