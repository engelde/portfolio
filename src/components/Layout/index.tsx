import { FC, ReactNode, useState } from 'react'
import Head from 'next/head'
import { Box, Container, ContainerProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import { config } from '@/utilities/config'

export type LayoutProps = ContainerProps & {
  title: String
  dark?: boolean
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ title, dark, children, ...rest }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Container maxW={'full'} p={0} bg={'black'} {...rest}>
      <Head>
        <title>{config.app.name + ' | ' + title}</title>
      </Head>

      <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />

      {!isLoading && (
        <Box as={motion.div} minH={'100vh'} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Box
            minH={'calc(100vh - 61px)'}
            p={4}
            pt={2}
            color={'white'}
            alignItems={'center'}
            justifyContent={'center'}>
            {[children]}
            <Footer dark={(dark !== undefined && dark && true) || false} />
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default Layout
