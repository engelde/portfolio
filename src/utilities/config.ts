import getConfig from 'next/config'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { publicRuntimeConfig } = getConfig()
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const version = publicRuntimeConfig?.version

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || '',
    author: process.env.NEXT_PUBLIC_APP_AUTHOR || '',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || '',
    version: (version as string) || '',
    environment: process.env.NODE_ENV || '',
  },
}
