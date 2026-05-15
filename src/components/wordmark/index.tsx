'use client'

import { Box, type BoxProps } from '@chakra-ui/react'

const ART = `██████╗  █████╗ ██╗   ██╗██╗██████╗     ███████╗███╗   ██╗ ██████╗ ███████╗██╗     
██╔══██╗██╔══██╗██║   ██║██║██╔══██╗    ██╔════╝████╗  ██║██╔════╝ ██╔════╝██║     
██║  ██║███████║██║   ██║██║██║  ██║    █████╗  ██╔██╗ ██║██║  ███╗█████╗  ██║     
██║  ██║██╔══██║╚██╗ ██╔╝██║██║  ██║    ██╔══╝  ██║╚██╗██║██║   ██║██╔══╝  ██║     
██████╔╝██║  ██║ ╚████╔╝ ██║██████╔╝    ███████╗██║ ╚████║╚██████╔╝███████╗███████╗
╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═════╝     ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝`

const Wordmark = (props: BoxProps) => {
  return (
    <Box
      as={'pre'}
      color={'purple.500'}
      fontFamily={'monospace'}
      fontWeight={'bold'}
      fontSize={{ base: '6px', sm: '9px', md: '11px', lg: '12px' }}
      lineHeight={1}
      whiteSpace={'pre'}
      m={0}
      aria-label={'David Engel'}
      {...props}
    >
      {ART}
    </Box>
  )
}

export default Wordmark
