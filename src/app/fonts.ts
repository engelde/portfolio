import { Geist, VT323 } from 'next/font/google'

const sans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const mono = VT323({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: '400',
})

export const fonts = {
  sans,
  mono,
}
