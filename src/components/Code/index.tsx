import { FC } from 'react'
import { Code as CkCode, CodeProps } from '@chakra-ui/react'

type Props = CodeProps & {
  text?: String
}

const Code: FC<Props> = ({ text, ...rest }: Props) => {
  return (
    <CkCode
      ml={1}
      mr={1}
      py={0}
      px={1}
      fontSize={'sm'}
      fontWeight={'bold'}
      bg={'black'}
      color={'white'}
      {...rest}>
      {text}
    </CkCode>
  )
}

export default Code
