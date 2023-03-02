import { FC, ReactNode, useState } from 'react'
import Head from 'next/head'
import { Box, Container, ContainerProps } from '@chakra-ui/react'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import config from '@/utilities/config'

type Props = ContainerProps & {
  title: String
  dark?: boolean
  children: ReactNode
}

const Layout: FC<Props> = ({ title, dark, children, ...rest }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Container maxWidth={'full'} p={0} bg={'black'} {...rest}>
      <Head>
        <title>{config.app.name + ' | ' + title}</title>
      </Head>

      <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />

      {!isLoading && (
        <Box minH={'100vh'}>
          <Box
            p={4}
            pt={2}
            zIndex={'top'}
            minHeight={'calc(100vh - 61px)'}
            alignItems={'center'}
            justifyContent={'center'}
            color={'white'}
            className={'animate__animated animate__fadeIn'}>
            {[children]}
          </Box>
          <Footer dark={(dark !== undefined && dark && true) || false} />
        </Box>
      )}
    </Container>
  )
}

export default Layout
