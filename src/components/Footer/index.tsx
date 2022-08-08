import { FC } from 'react'
import { HStack, VStack, Text } from '@chakra-ui/react'
import Code from '@/components/Code'
import config from '@/utilities/config'

type Props = {
  dark?: boolean
}

const Footer: FC<Props> = ({ dark }: Props) => {
  const year = new Date().getFullYear()

  return (
    <HStack
      zIndex={999}
      position={'fixed'}
      bottom={0}
      left={0}
      width={'full'}
      justifyContent={'space-between'}
      p={3}>
      <VStack alignItems={'right'}>
        {(dark && (
          <Code
            text={'© ' + year + ' ' + config.app.author + ' | v' + config.app.version}
            className={'animate__animated animate__fadeInLeftBig'}
          />
        )) || (
          <Text
            fontSize={'sm'}
            color={'white'}
            textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
            className={'animate__animated animate__fadeInLeftBig'}>
            {'© ' + year + ' ' + config.app.author + ' | v' + config.app.version}
          </Text>
        )}
      </VStack>
      {(dark && (
        <Code text={'</body>'} className={'animate__animated animate__fadeInRightBig'} />
      )) || (
        <Text
          fontSize={'sm'}
          color={'white'}
          textShadow={'1px 1px rgba(0, 0, 0, 0.09)'}
          className={'animate__animated animate__fadeInRightBig'}>
          {'</body>'}
        </Text>
      )}
    </HStack>
  )
}

export default Footer
