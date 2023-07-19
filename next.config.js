/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  output: 'standalone',
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
}

module.exports = nextConfig
