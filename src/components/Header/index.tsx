import { FC } from 'react'
import { Flex, FlexProps, IconButton, HStack } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

type Props = FlexProps & {
  setSidebarOpen: (status: boolean) => void
}

const Header: FC<Props> = ({ setSidebarOpen, ...rest }: Props) => {
  return (
    <Flex pr={{ base: 2, lg: 2 }} pl={{ base: 2, lg: 2 }} {...rest}>
      <HStack>
        <IconButton
          variant={'link'}
          zIndex={99}
          py={4}
          size={'lg'}
          color={'white'}
          aria-label={'open sidebar'}
          onClick={() => setSidebarOpen(true)}
          icon={<FiMenu />}
          className={'animate__animated animate__fadeInDownBig'}
        />
      </HStack>
    </Flex>
  )
}

export default Header
