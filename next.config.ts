import type { NextConfig } from 'next'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { version } = require('./package.json')

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
}

export default nextConfig
