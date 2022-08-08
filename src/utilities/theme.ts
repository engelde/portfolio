import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'VT323, monospace',
    body: 'VT323, monospace',
    code: 'VT323, monospace',
  },
  shadows: {
    outline: 'none',
  },
})

export default theme
