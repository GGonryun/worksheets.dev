import { newPubSub } from '@worksheets/firebase/pubsub';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, test } = req.query;
  const ps = newPubSub<{ id: string; test: string }>('sample');

  const data = await ps.publish({ id: id as string, test: test as string });

  res.status(200).json({ ok: true, data, request: { id, test } });
}
