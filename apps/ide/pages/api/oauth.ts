import { resolveHandshake } from '@worksheets/feat/execution-settings';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { query, url } = req;

  const result = await resolveHandshake(url, query['state'] as string);

  res.status(302).redirect(result.url);

  console.info(`save oauth result handled`, result.url);

  return;
};

export default handler;
