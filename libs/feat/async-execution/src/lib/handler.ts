import { NextApiRequest, NextApiResponse } from 'next';
import { OfficialApplicationLibrary } from '@worksheets/apps/library';
import { Execution, ExecutionFailure } from '@worksheets/engine';
import { verifyIdToken } from '@worksheets/auth/server';
export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyIdToken(req);
  const yaml = req.body;

  const library = new OfficialApplicationLibrary();
  const execution = new Execution({ library });
  try {
    const result = await execution.run(yaml);
    res.status(200).json({ ok: true, user: user.uid, result });
  } catch (error) {
    console.error(error);
    if (error instanceof ExecutionFailure) {
      res.status(400).json({ message: error.message });
    } else {
      res.send(500);
    }
  }
}
