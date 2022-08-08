/** @type {import('next').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    outputStandalone: true,
  },
}

module.exports = nextConfig
