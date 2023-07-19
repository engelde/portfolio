import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import { theme } from '@/utilities/theme'
import '@fontsource/vt323/400.css'
import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  )
}

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  if (process.env.NODE_ENV != 'production') {
    console.log(metric)
  }
}

export default MyApp
