import type { NextApiRequest, NextApiResponse } from 'next'

type Response = {
  address: string
}

const Ip = (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const address = req.socket.remoteAddress

  res.status(200).json({
    address: address !== undefined ? address : '127.0.0.1',
  })
}

export default Ip
