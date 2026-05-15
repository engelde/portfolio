import { headers } from 'next/headers'

import Layout from '@/components/layout'
import SuperMario from '@/components/super-mario'

export default async function Home() {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip')
  const clientIp = ip && ip !== '::1' ? ip : '127.0.0.1'

  return (
    <Layout bg={'black'} dark={true}>
      <SuperMario ip={clientIp} />
    </Layout>
  )
}
