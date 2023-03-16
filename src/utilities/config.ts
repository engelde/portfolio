import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const version = publicRuntimeConfig?.version

type ConfigProps = {
  [key: string]: {
    [val: string]: string
  }
}

export const config: ConfigProps = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || '',
    author: process.env.NEXT_PUBLIC_APP_AUTHOR || '',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || '',
    version: version,
    environment: process.env.NODE_ENV || '',
  },
}
