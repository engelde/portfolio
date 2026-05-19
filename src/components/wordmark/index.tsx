'use client'

import { Box, type BoxProps } from '@chakra-ui/react'

const Wordmark = (props: BoxProps) => {
  const { fontSize, ...rest } = props
  const width =
    fontSize === '5px'
      ? { base: '280px', sm: '350px' }
      : { base: '360px', sm: '540px', md: '700px' }

  return (
    <Box
      as={'img'}
      src={'/images/wordmark/wordmark.svg'}
      alt={'David Engel'}
      draggable={false}
      loading={'eager'}
      decoding={'sync'}
      display={'inline-block'}
      w={width}
      maxW={'100%'}
      h={'auto'}
      m={0}
      {...rest}
    />
  )
}

export default Wordmark
