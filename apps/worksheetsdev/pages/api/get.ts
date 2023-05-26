import { newDatabase } from '@worksheets/firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = newDatabase<{ id: string; test: string }>('sample');

  const id = req.query.id as string;

  if (!id) {
    return res.send(400);
  }

  const data = await db.get(id);

  return res.status(200).json({ ok: true, data });
}
