import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    cssVarPrefix: 'app',
  },
  fonts: {
    heading: 'VT323, monospace',
    body: 'VT323, monospace',
    code: 'VT323, monospace',
  },
  initialColorMode: 'light',
  shadows: {
    outline: 'none',
  },
  useSystemColorMode: false,
})
