import type { GetServerSidePropsContext, NextPage } from 'next'
import Layout from '@/components/Layout'
import SuperMario from '@/components/SuperMario'

type HomeProps = {
  ip: string
}

export const config = {
  runtime: 'experimental-edge',
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const forwarded = ctx.req.headers['x-forwarded-for']
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : ctx.req.socket.remoteAddress

  return {
    props: {
      ip: ip !== undefined ? ip : '127.0.0.1',
    },
  }
}

const Home: NextPage<HomeProps> = ({ ip }: HomeProps) => {
  const pageTitle = 'Software Engineer'

  return (
    <Layout title={pageTitle} bg={'black'} dark={true}>
      <SuperMario ip={ip} />
    </Layout>
  )
}

export default Home
