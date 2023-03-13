import { FC, useEffect } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { CgMenuLeftAlt } from 'react-icons/cg'
import { motion } from 'framer-motion'
import { useStore } from '@/utilities/store'

export type PauseProps = {
  open: boolean
  setOpen: (status: boolean) => void
  setXPos: (pos: number) => void
  setYPos: (pos: number) => void
  audioLevel: number
  setAudioLevel: (status: number) => void
  maxX: number
}

type MenuLink = {
  name: string
  color: string
  x: number
  y: number
}

const Pause: FC<PauseProps> = ({
  open,
  setOpen,
  setXPos,
  setYPos,
  audioLevel,
  setAudioLevel,
  maxX,
}: PauseProps) => {
  const [store, updateStore] = useStore()

  const links: MenuLink[] = [
    { name: '.Home()', color: 'cyan.300', x: 0, y: 64 },
    { name: '.About()', color: 'cyan.300', x: 3520, y: 128 },
    { name: '.Contact()', color: 'cyan.300', x: maxX, y: 64 },
  ]

  const handleOpen = () => {
    setOpen(true)

    if (audioLevel > 0) {
      const sound = new Audio('/audio/pause/pause.mp3')
      sound.volume = audioLevel / 100
      sound.play()
    }
  }

  const handleClose = () => {
    setOpen(false)

    if (audioLevel > 0) {
      const sound = new Audio('/audio/stomp/stomp.mp3')
      sound.volume = audioLevel / 100
      sound.play()
    }
  }

  const handleInventory = (x: number, y: number) => {
    if (window.scrollY !== x) {
      // @ts-ignore
      window.scrollTo({ top: x, behavior: 'instant' })
      setXPos(x)
      setYPos(y)
    }

    setOpen(false)

    if (audioLevel > 0) {
      const sound = new Audio('/audio/inventory/inventory.mp3')
      sound.volume = audioLevel / 100
      sound.play()
    }
  }

  const handleAudioLevel = (val: number) => {
    setAudioLevel(val)
    updateStore({ type: 'UPDATE_AUDIO_LEVEL', payload: val })
  }

  return (
    <>
      <Flex pr={{ base: 2, lg: 2 }} pl={{ base: 2, lg: 2 }}>
        <HStack>
          <IconButton
            as={motion.div}
            variant={'link'}
            zIndex={15}
            position={'fixed'}
            top={0}
            left={0}
            py={4}
            size={'lg'}
            color={'white'}
            cursor={'pointer'}
            title={'Pause'}
            aria-label={'open menu'}
            icon={<CgMenuLeftAlt />}
            onClick={handleOpen}
            _active={{ color: 'cyan.300' }}
            initial={{ translateY: '-150%' }}
            animate={{ translateY: 0, transition: { delay: 1 } }}
            whileHover={{ color: '#76E4F7', scale: 1.25 }}
          />
        </HStack>
      </Flex>

      <Drawer isOpen={open} placement={'left'} size={'md'} onClose={handleClose}>
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
                <Heading size={'4xl'} color={'cyan.500'}>
                  David.Engel
                </Heading>
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
                      onClick={() => handleInventory(link.x, link.y)}>
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
                    defaultValue={audioLevel}
                    onChange={(val) => handleAudioLevel(val)}>
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
