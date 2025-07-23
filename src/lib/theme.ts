import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    cssVarPrefix: 'app',
  },
  fonts: {
    heading: 'var(--font-mono)',
    body: 'var(--font-mono)',
    code: 'var(--font-mono)',
  },
  initialColorMode: 'light',
  shadows: {
    outline: 'none',
  },
  useSystemColorMode: false,
})
