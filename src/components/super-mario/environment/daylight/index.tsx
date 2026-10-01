'use client'

import { Box } from '@chakra-ui/react'

const daylightCycle = 'sm-daylight-cycle'

const Daylight = () => {
  return (
    <Box
      position={'fixed'}
      top={0}
      left={0}
      minW={'100vw'}
      minH={'100vh'}
      backgroundSize={'100% 800%'}
      backgroundImage={'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%)'}
      sx={{
        animation: `${daylightCycle} 90s linear infinite`,
      }}
    />
  )
}

export default Daylight
