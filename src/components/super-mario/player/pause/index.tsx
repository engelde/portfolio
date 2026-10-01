'use client'

import { type ChangeEvent, useCallback, useEffect } from 'react'
import NextImage from 'next/image'
import { Box, Drawer, Flex, Heading, HStack, Portal, Text, VStack } from '@chakra-ui/react'

import { MotionBox, MotionButton } from '@/components/motion'
import Wordmark from '@/components/wordmark'
import { useAudio } from '@/hooks/useAudio'
import { type PlayerCharacter, useStore } from '@/lib/store'

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

const playerCharacters: PlayerCharacter[] = ['mario', 'luigi']

const Pause = ({ length, open, setOpen, setX, setY }: PauseProps) => {
  const { audio, playAudio, setAudio } = useAudio()
  const playerCharacter = useStore((state) => state.playerCharacter)
  const setPlayerCharacter = useStore((state) => state.setPlayerCharacter)

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

  const handleClose = useCallback(() => {
    setOpen(false)
    playAudio('stomp')
  }, [setOpen, playAudio])

  const handleLink = (x: number, y: number) => {
    setOpen(false)
    playAudio('inventory')

    setTimeout(() => {
      if (window.scrollY !== x) {
        window.scrollTo({ top: x, behavior: 'instant' })
      }

      setTimeout(() => {
        setX(x)
        setY(y)
      }, 100)
    }, 50)
  }

  const handleAudioLevel = (val: number) => {
    setAudio(val)
  }

  const handleAudioInput = (event: ChangeEvent<HTMLInputElement>) => {
    handleAudioLevel(Number(event.currentTarget.value))
  }

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, handleClose])

  return (
    <>
      <Flex pr={{ base: 2, lg: 2 }} pl={{ base: 2, lg: 2 }}>
        <HStack>
          <MotionButton
            as="p"
            title={'Pause'}
            aria-label={'open menu'}
            variant={'plain'}
            h={'auto'}
            minW={'auto'}
            borderWidth={0}
            fontWeight={'semibold'}
            lineHeight={'normal'}
            zIndex={15}
            position={'fixed'}
            top={4}
            left={4}
            py={1.5}
            px={2.5}
            size={'sm'}
            color={'white'}
            background={'black'}
            borderRadius={0}
            cursor={'pointer'}
            fontSize={'16px'}
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
          </MotionButton>
        </HStack>
      </Flex>

      <Drawer.Root
        open={open}
        placement={'start'}
        // Escape is handled by the window listener above, as in the game's own controls.
        closeOnEscape={false}
        size="lg"
        onOpenChange={(e) => {
          if (!e.open) {
            handleClose()
          }
        }}
      >
        <Portal>
          <Drawer.Backdrop bg={'blackAlpha.800'} />
          <Drawer.Positioner>
            <Drawer.Content
              fontSize={'md'}
              lineHeight={1.5}
              color={'white'}
              bg={'black'}
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
              <Drawer.CloseTrigger asChild>
                <MotionBox
                  position={'absolute'}
                  top={2}
                  insetEnd={3}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  w={8}
                  h={8}
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
                </MotionBox>
              </Drawer.CloseTrigger>
              <Drawer.Body>
                <Flex h={'90vh'} w={'full'} alignItems={'center'} justifyContent={'center'}>
                  <VStack gap={12}>
                    <VStack gap={8} alignItems={'center'} justifyContent={'center'}>
                      <Wordmark textAlign={'center'} fontSize={'5px'} />

                      <Heading fontSize={'4xl'} color={'white'}>
                        PAUSED
                      </Heading>
                    </VStack>

                    <VStack gap={0} alignItems={'center'} justifyContent={'center'}>
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

                    <VStack gap={3} alignItems={'center'} justifyContent={'center'}>
                      <Text fontSize={'2xl'} textAlign={'center'}>
                        Player
                      </Text>

                      <HStack gap={4} role={'radiogroup'} aria-label={'Player character'}>
                        {playerCharacters.map((character) => {
                          const selected = playerCharacter === character

                          return (
                            <Flex
                              key={character}
                              role={'radio'}
                              aria-checked={selected}
                              alignItems={'center'}
                              justifyContent={'center'}
                              w={'70px'}
                              h={'70px'}
                              p={'2px'}
                              border={'none'}
                              borderRadius={0}
                              cursor={'pointer'}
                              bg={selected ? 'white' : 'transparent'}
                              appearance={'none'}
                              outline={'none'}
                              transition={'background-color 0.15s ease'}
                              _hover={{
                                bg: 'cyan.500',
                              }}
                              _focus={{
                                outline: 'none',
                              }}
                              _focusVisible={{
                                outline: 'none',
                              }}
                              css={{
                                '&:focus': {
                                  outline: 'none !important',
                                },

                                '&:focus-visible': {
                                  outline: 'none !important',
                                },
                              }}
                              asChild
                            >
                              <button type={'button'} onClick={() => setPlayerCharacter(character)}>
                                <Flex
                                  alignItems={'center'}
                                  justifyContent={'center'}
                                  w={'full'}
                                  h={'full'}
                                  bg={'black'}
                                >
                                  <NextImage
                                    alt={character}
                                    src={`/images/${character}/${character}.regular.1.png`}
                                    width={48}
                                    height={48}
                                    draggable={false}
                                    unoptimized
                                    style={{
                                      height: '48px',
                                      imageRendering: 'pixelated',
                                      objectFit: 'contain',
                                      width: '48px',
                                    }}
                                  />
                                </Flex>
                              </button>
                            </Flex>
                          )
                        })}
                      </HStack>
                    </VStack>

                    <VStack gap={2} alignItems={'center'} justifyContent={'center'}>
                      <Text fontSize={'2xl'} textAlign={'center'}>
                        Audio
                      </Text>

                      <Box
                        position={'relative'}
                        aria-label={'audio-slider'}
                        data-allow-scroll-lock-gesture={'true'}
                        w={'120px'}
                        h={'24px'}
                      >
                        <Box
                          position={'absolute'}
                          top={'50%'}
                          left={0}
                          right={0}
                          h={'4px'}
                          transform={'translateY(-50%)'}
                          bg={'rgba(255, 255, 255, 0.42)'}
                          pointerEvents={'none'}
                        >
                          <Box
                            data-audio-fill={'true'}
                            h={'full'}
                            w={`${audio}%`}
                            bg={'cyan.500'}
                          />
                        </Box>
                        <Box
                          data-audio-thumb={'true'}
                          position={'absolute'}
                          top={'50%'}
                          left={`calc(${audio}% - 7px)`}
                          w={'14px'}
                          h={'14px'}
                          borderRadius={'50%'}
                          transform={'translateY(-50%)'}
                          bg={'white'}
                          pointerEvents={'none'}
                        />
                        <Box
                          aria-label={'audio-slider'}
                          data-allow-scroll-lock-gesture={'true'}
                          position={'absolute'}
                          inset={0}
                          w={'full'}
                          h={'full'}
                          m={0}
                          cursor={'pointer'}
                          _focusVisible={{
                            outline: '2px solid',
                            outlineColor: 'cyan.500',
                            outlineOffset: '5px',
                          }}
                          css={{
                            appearance: 'none',
                            bg: 'transparent',
                            touchAction: 'none',

                            '&::-webkit-slider-runnable-track': {
                              h: '24px',
                              bg: 'transparent',
                            },

                            '&::-webkit-slider-thumb': {
                              appearance: 'none',
                              w: '18px',
                              h: '24px',
                              bg: 'transparent',
                              cursor: 'grab',
                            },

                            '&:active::-webkit-slider-thumb': {
                              cursor: 'grabbing',
                            },

                            '&::-moz-range-track': {
                              h: '24px',
                              bg: 'transparent',
                            },

                            '&::-moz-range-thumb': {
                              w: '18px',
                              h: '24px',
                              border: 0,
                              bg: 'transparent',
                              cursor: 'grab',
                            },

                            '&:active::-moz-range-thumb': {
                              cursor: 'grabbing',
                            },
                          }}
                          asChild
                        >
                          <input
                            type={'range'}
                            min={0}
                            max={100}
                            value={audio}
                            onChange={handleAudioInput}
                          />
                        </Box>
                      </Box>
                    </VStack>
                  </VStack>
                </Flex>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}

export default Pause
