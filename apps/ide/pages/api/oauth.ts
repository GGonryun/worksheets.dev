import { resolveHandshake } from '@worksheets/feat/app-connections';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const result = await resolveHandshake(req.url, req.query['state'] as string);

  res.status(302).redirect(result.url);

  return;
};

export default handler;
