import { FC } from 'react'
import { Code as CkCode, type CodeProps as CkCodeProps } from '@chakra-ui/react'

export type CodeProps = CkCodeProps & {
  text?: String
}

const Code: FC<CodeProps> = ({ text, ...rest }: CodeProps) => {
  return (
    <CkCode
      mx={1}
      px={1}
      py={0}
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
