type ConfigProps = {
  [key: string]: {
    [val: string]: string
  }
}

const config: ConfigProps = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || '',
    author: process.env.NEXT_PUBLIC_APP_AUTHOR || '',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || '',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '',
    environment: process.env.NODE_ENV || '',
  },
}

export default config
