import { useEffect } from 'react'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useStore } from '@/utilities/store'
import { theme } from '@/utilities/theme'
import '@fontsource/vt323/400.css'
import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Hydrate store
  useEffect(() => {
    void useStore.persist.rehydrate()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  if (process.env.NODE_ENV != 'production') {
    console.log(metric)
  }
}

export default MyApp
