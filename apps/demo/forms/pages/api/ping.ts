import { newClient } from '@worksheets/sdk';
import { NextApiHandler } from 'next';
// eslint-disable-next-line @nx/enforce-module-boundaries
const registry = newClient({
  baseUrl: 'http://localhost:4201/v1',
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const time = await registry.time().now({});
    console.log('getting time', time);
    res.status(200).json({ ok: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export default handler;
