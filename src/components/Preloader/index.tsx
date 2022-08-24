import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, BoxProps, Flex, Icon, Text, VStack } from '@chakra-ui/react'
import { FiArrowDown } from 'react-icons/fi'
import styles from './styles.module.css'

const ScrollInstructions: FC = () => {
  return (
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
        <Text fontSize={'4xl'} color={'blue.400'} mb={6} textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}>
          <strong>Scroll down to start!</strong>
        </Text>
        <Icon
          as={FiArrowDown}
          height={16}
          width={16}
          color={'white'}
          textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
        />
      </VStack>
    </Flex>
  )
}

type Props = BoxProps & {
  isLoading: boolean
  setIsLoading: (status: boolean) => void
}

const Preloader: FC<Props> = ({ isLoading, setIsLoading, ...rest }: Props) => {
  const [isPreloading, setIsPreloading] = useState(true)
  const [isInstructing, setIsInstructing] = useState(false)
  const [position, setPosition] = useState(1)
  const router = useRouter()

  useEffect(() => {
    if (isPreloading) {
      if (router.pathname != '/') {
        setIsPreloading(false)
        setIsLoading(false)
      } else {
        setTimeout(() => {
          setIsPreloading(false)
          setTimeout(() => {
            setPosition(2)
            setIsInstructing(true)
          }, 800)
        }, 1000)
      }
    }
  }, [isPreloading, setIsPreloading, setIsLoading, router])

  // Start on scroll
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
      className={(!isLoading && 'animate__animated animate__slideOutDown') || ''}>
      <Flex
        w={'full'}
        height={isInstructing ? '110vh' : 'full'}
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
            <ScrollInstructions />
          </VStack>
        )}
      </Flex>
    </Box>
  )
}

export default Preloader
