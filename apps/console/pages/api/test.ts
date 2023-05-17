import { NextApiRequest, NextApiResponse } from 'next';
import { registry } from '@worksheets/apps/registry';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(registry());
  res.status(200).json({ name: 'John Doe' });
}
