import { FC } from 'react'
import { Flex, Icon, Text, VStack } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'

const ScrollIndicator: FC = () => {
  return (
    <Flex
      position={'fixed'}
      zIndex={1}
      bottom={0}
      left={0}
      w={'full'}
      className={'animate__animated animate__fadeInUpBig'}
      alignItems={'center'}
      justifyContent={'center'}>
      <VStack
        alignItems={'center'}
        justifyContent={'center'}
        p={1}
        spacing={0}
        className={'animate__animated animate__infinite animate__pulse'}>
        <Text fontSize={'lg'} color={'white'} textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}>
          Scroll for more!
        </Text>
        <Icon as={FiChevronDown} height={8} width={8} textShadow={'1px 1px rgba(0, 0, 0, 0.09)'} />
      </VStack>
    </Flex>
  )
}

export default ScrollIndicator
