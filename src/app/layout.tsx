import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { config } from '@/lib/config'

import { fonts } from './fonts'
import { Providers } from './providers'

import './globals.css'
import './animations.css'

export const metadata: Metadata = {
  title: 'David Engel | Software Engineer',
  description: config.app.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.sans.variable} ${fonts.mono.variable}`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
