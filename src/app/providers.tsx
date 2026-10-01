'use client'

import { ChakraProvider } from '@chakra-ui/react'

import { EmotionRegistry } from '@/components/ui/emotion-registry'
import { system } from '@/lib/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </EmotionRegistry>
  )
}
