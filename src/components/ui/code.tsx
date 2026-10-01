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
      display={'inline-block'}
      minH={0}
      borderRadius={'xs'}
      textStyle={'none'}
      fontSize={'sm'}
      fontWeight={'bold'}
      lineHeight={'inherit'}
      bg={'black'}
      color={'white'}
      {...rest}
    >
      {text}
    </CkCode>
  )
}

export default Code
