import { createRequire } from 'module'
import type { NextConfig } from 'next'

const require = createRequire(import.meta.url)
const { version } = require('./package.json')

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    version: version,
  },
}

export default nextConfig
