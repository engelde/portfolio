import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/utilities/theme'
import { StoreProvider } from '@/utilities/store'
import '@fontsource/vt323/400.css'
import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </StoreProvider>
  )
}

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  if (process.env.NODE_ENV != 'production') {
    console.log(metric)
  }
}

export default MyApp
