import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { query, url } = req;

  // const result = await resolveHandshake(url, query['state'] as string);

  res.status(302).redirect('https://worksheets.dev');

  console.info(`save oauth result handled`, { query, url });

  return;
};

export default handler;
