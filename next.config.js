/** @type {import('next').NextConfig} */

const { version } = require('./package.json')

const nextConfig = {
  experimental: {
    appDir: false,
  },
  output: 'standalone',
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    version,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
