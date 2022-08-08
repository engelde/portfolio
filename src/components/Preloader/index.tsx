import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, BoxProps, Flex, Text, VStack } from '@chakra-ui/react'
import styles from './styles.module.css'

type Props = BoxProps & {
  isLoading: boolean
  setIsLoading: (status: boolean) => void
}

const Preloader: FC<Props> = ({ isLoading, setIsLoading, ...rest }: Props) => {
  const [isPreloading, setIsPreloading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (isPreloading) {
      if (router.pathname != '/') {
        setIsPreloading(false)
        setIsLoading(false)
      } else {
        setTimeout(() => {
          setIsPreloading(false)
          setIsLoading(false)
        }, 1000)
      }
    }
  }, [isPreloading, setIsPreloading, setIsLoading, router])

  return (
    <Box
      zIndex={'overlay'}
      position={'fixed'}
      top={0}
      left={0}
      width={'full'}
      height={'100vh'}
      bg={'black'}
      className={(!isLoading && 'animate__animated animate__slideOutDown') || ''}>
      <Flex h={'full'} w={'full'} alignItems={'center'} justifyContent={'center'}>
        <VStack className={(!isPreloading && 'animate__animated animate__backOutDown') || ''}>
          <Flex className={styles.preloader} />
          <Text fontSize={'2xl'} color={'white'}>
            Loading...
          </Text>
        </VStack>
      </Flex>
    </Box>
  )
}

export default Preloader
