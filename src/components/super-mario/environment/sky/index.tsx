'use client'

import type { FC } from 'react'
import { Box } from '@chakra-ui/react'

const Sky: FC = () => {
  return (
    <Box
      position={'fixed'}
      top={0}
      left={0}
      w={'full'}
      minW={'full'}
      minH={'100vh'}
      backgroundSize={'200% 200%'}
      backgroundImage={'linear-gradient(-135deg, #0987a0 0%, #3182ce 50%, #2c5282 100%)'}
    />
  )
}

export default Sky
