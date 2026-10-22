import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'request'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { src } = req.query
  
  if (!src || typeof src !== 'string') {
    return res.status(401)
  }
  const buffer = request(src)
  const ext = src.split('.').pop()?.toLowerCase()
  res.setHeader('Cache-Control', `public, max-age=${31557600}`)
  res.setHeader('Content-Type', `image/${ext}`)
  return buffer.pipe(res)
}
