import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import SuperMario from '@/components/SuperMario'

const Home: NextPage = () => {
  const pageTitle = 'Software Engineer'

  return (
    <Layout title={pageTitle} bg={'black'} dark={true}>
      <SuperMario />
    </Layout>
  )
}

export default Home
