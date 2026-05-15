'use client'

import { Box } from '@chakra-ui/react'

const Overlay = () => {
  return (
    <Box
      position={'fixed'}
      top={0}
      left={0}
      w={'100vw'}
      h={'100vh'}
      backgroundColor={'rgba(0, 0, 0, 0.15)'}
    />
  )
}

export default Overlay
