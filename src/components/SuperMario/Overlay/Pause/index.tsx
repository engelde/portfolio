import { FC } from 'react'
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
  Text,
  VStack,
} from '@chakra-ui/react'
import { CgMenuLeftAlt } from 'react-icons/cg'

type MenuLink = {
  name: string
  color: string
  x: number
  y: number
}

type Props = {
  open: boolean
  setOpen: (status: boolean) => void
  setXPos: (pos: number) => void
  setYPos: (pos: number) => void
  maxX: number
}

const Pause: FC<Props> = ({ open, setOpen, setXPos, setYPos, maxX }: Props) => {
  const links: MenuLink[] = [
    { name: '.home()', color: 'cyan.300', x: 0, y: 64 },
    { name: '.about()', color: 'cyan.300', x: 3500, y: 128 },
    { name: '.contact()', color: 'cyan.300', x: maxX, y: 64 },
  ]

  return (
    <>
      <Flex pr={{ base: 2, lg: 2 }} pl={{ base: 2, lg: 2 }}>
        <HStack>
          <IconButton
            variant={'link'}
            zIndex={9999}
            position={'fixed'}
            top={0}
            left={0}
            py={4}
            size={'lg'}
            color={'white'}
            title={'Pause'}
            aria-label={'open menu'}
            onClick={() => setOpen(true)}
            _hover={{ color: 'cyan.300', transform: 'scale(1.25) !important' }}
            _active={{ color: 'cyan.300' }}
            icon={<CgMenuLeftAlt />}
            className={'animate__animated animate__fadeInDownBig'}
          />
        </HStack>
      </Flex>
      <Drawer isOpen={open} placement={'left'} size={'md'} onClose={() => setOpen(false)}>
        <DrawerOverlay bg={'blackAlpha.800'} />
        <DrawerContent color={'white'} bg={'blackAlpha.900'}>
          <DrawerCloseButton _hover={{ color: 'cyan.300' }} _active={{ color: 'cyan.300' }} />
          <DrawerBody>
            <Flex h={'80vh'} w={'full'} alignItems={'center'} justifyContent={'center'}>
              <VStack spacing={8}>
                <Heading size={'4xl'} color={'cyan.500'}>
                  David.Engel
                </Heading>
                <Heading fontSize={'4xl'} color={'white'}>
                  paused
                </Heading>

                <VStack spacing={0} alignItems={'left'} mb={4}>
                  {links.map((link, x) => (
                    <Text
                      key={x}
                      fontSize={'1.75rem'}
                      textAlign={'center'}
                      _hover={{ cursor: 'pointer', color: link.color }}
                      onClick={() => {
                        if (window.scrollY !== link.x)
                          window.scrollTo({ top: link.x, behavior: 'smooth' })
                        setXPos(link.x)
                        setYPos(link.y)
                        setOpen(false)
                      }}>
                      {link.name}
                    </Text>
                  ))}
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
