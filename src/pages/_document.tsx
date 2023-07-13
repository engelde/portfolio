import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import { config } from '@/utilities/config'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta name='robots' content='index,follow' />
          <link rel='icon' type='image/ico' href='/favicon.ico' />
          <meta name='description' content={config.app.description} />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
