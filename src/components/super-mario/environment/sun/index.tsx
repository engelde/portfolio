'use client'

import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

const sunCycle = 'sm-sun-cycle'

const Sun = () => {
  return (
    <Box position={'fixed'} top={0} right={0} minW={'full'}>
      <Box
        position={'absolute'}
        top={0}
        right={0}
        w={240}
        h={240}
        opacity={0.4}
        css={{
          animation: `${sunCycle} 90s linear infinite`,
        }}
      >
        <NextImage alt={'sun'} src={'/images/sun/sun.png'} width={240} height={240} unoptimized />
      </Box>

      <Box
        position={'absolute'}
        top={12.5}
        right={12.5}
        w={215}
        h={215}
        opacity={0.9}
        css={{
          animation: `${sunCycle} 90s linear infinite`,
        }}
      >
        <NextImage
          alt={'sun'}
          src={'/images/sun/sun.png'}
          width={215}
          height={215}
          draggable={false}
          unoptimized
        />
      </Box>
    </Box>
  )
}

export default Sun
