import { config } from '@/lib/config'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { fonts } from './fonts'
import './globals.css'
import { Providers } from './providers'

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
      <body className={`${fonts.sans.variable} ${fonts.mono.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
