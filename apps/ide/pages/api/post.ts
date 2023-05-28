import { newDatabase } from '@worksheets/firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  if (!id) {
    return res.send(400);
  }

  const db = newDatabase<{ id: string; test: string }>('sample');

  db.insert({ test: 'yes', id });

  res.send(204);
}
