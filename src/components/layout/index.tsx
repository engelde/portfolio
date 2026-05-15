'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import type { ContainerProps } from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import Footer from '@/components/footer'
import Preloader from '@/components/preloader'

export type LayoutProps = ContainerProps & {
  dark?: boolean
  children: ReactNode
}

const Layout = ({ dark, children, ...rest }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Container maxW={'full'} p={0} bg={'black'} {...rest}>
      <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />

      {!isLoading && (
        <Box as={motion.div} minH={'100vh'} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Box
            minH={'calc(100vh - 61px)'}
            p={6}
            pt={2}
            color={'white'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {children}
            <Footer dark={(dark !== undefined && dark && true) || false} />
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default Layout
