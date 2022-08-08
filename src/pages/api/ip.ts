import type { NextApiRequest, NextApiResponse } from 'next'

type Response = {
  address: string
}

const Ip = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  res.status(200).json({
    address:
      (req.connection.remoteAddress !== '::1' && req.connection.remoteAddress) || '127.0.0.1',
  })
}

export default Ip
