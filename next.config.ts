import { createRequire } from 'node:module'
import type { NextConfig } from 'next'

const require = createRequire(import.meta.url)
const { version } = require('./package.json')

const nextConfig: NextConfig = {
  // The Docker image builds a self-contained server; Vercel ignores this.
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
}

export default nextConfig
