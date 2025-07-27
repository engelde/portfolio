import type { CodeProps as CkCodeProps } from '@chakra-ui/react'
import { Code as CkCode } from '@chakra-ui/react'

export type CodeProps = CkCodeProps & {
  text?: string
}

const Code = ({ text, ...rest }: CodeProps) => {
  return (
    <CkCode
      mx={1}
      px={1}
      py={0}
      fontSize={'sm'}
      fontWeight={'bold'}
      bg={'black'}
      color={'white'}
      {...rest}
    >
      {text}
    </CkCode>
  )
}

export default Code
