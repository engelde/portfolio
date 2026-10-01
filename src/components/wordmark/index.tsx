'use client'

import { chakra, type HTMLChakraProps } from '@chakra-ui/react'

const Wordmark = (props: HTMLChakraProps<'img'>) => {
  const { fontSize, ...rest } = props
  const width =
    fontSize === '5px'
      ? { base: '280px', sm: '350px' }
      : { base: '360px', sm: '540px', md: '700px' }

  return (
    // biome-ignore lint/performance/noImgElement: static svg wordmark, nothing for next/image to optimize
    <chakra.img
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
