// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { img } from '../../components/img/img';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(img);
  }
}
