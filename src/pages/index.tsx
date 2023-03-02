import type { GetServerSidePropsContext, NextPage } from 'next'
import Layout from '@/components/Layout'
import SuperMario from '@/components/SuperMario'

type Props = {
  ip: string
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const forwarded = ctx.req.headers['x-forwarded-for']
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : ctx.req.socket.remoteAddress

  console.log(ip)

  return {
    props: {
      ip: ip !== undefined ? ip : '127.0.0.1',
    },
  }
}

const Home: NextPage<Props> = ({ ip }: Props) => {
  const pageTitle = 'Software Engineer'

  return (
    <Layout title={pageTitle} bg={'black'} dark={true}>
      <SuperMario ip={ip} />
    </Layout>
  )
}

export default Home
