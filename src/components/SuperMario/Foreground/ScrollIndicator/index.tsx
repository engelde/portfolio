import { FC } from 'react'
import { Flex, FlexProps, Icon, Text, VStack } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'

const ScrollIndicator: FC<FlexProps> = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      position={'fixed'}
      zIndex={9999}
      bottom={0}
      left={0}
      w={'full'}
      mb={7}
      alignItems={'center'}
      justifyContent={'center'}
      {...rest}>
      <VStack
        alignItems={'center'}
        justifyContent={'center'}
        p={1}
        spacing={0}
        className={'animate__animated animate__infinite animate__pulse'}>
        <Text fontSize={'xl'} color={'white'} textShadow={'2px 2px rgba(0, 0, 0, 0.5)'}>
          Scroll for more!
        </Text>
        <Icon as={FiChevronDown} height={8} width={8} textShadow={'2px 2px rgba(0, 0, 0, 0.33)'} />
      </VStack>
    </Flex>
  )
}

export default ScrollIndicator
