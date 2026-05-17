'use client'

import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const sunCycle = keyframes`
  0% {
    margin-top: 35px;
    margin-right: 35px;
    transform: scale(0.8);
  }
  36%, 40% {
    margin-top: -125px;
    margin-right: -125px;
    transform: scale(0.9);
  }
  48%, 56% {
    margin-top: -300px;
    margin-right: -300px;
    transform: scale(1);
  }
  64%, 94% {
    margin-top: -125px;
    margin-right: -125px;
    transform: scale(0.9);
  }
  100% {
    margin-top: 35px;
    margin-right: 35px;
    transform: scale(0.8);
  }
`

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
        sx={{
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
        sx={{
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
