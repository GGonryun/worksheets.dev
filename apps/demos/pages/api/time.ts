import { newClient } from '@worksheets/sdk';
import { NextApiHandler } from 'next';
import { API_URL } from '../../src/const';

const registry = newClient({
  baseUrl: API_URL,
  logging: 'verbose',
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const time = await registry.time().now({});
    console.log('getting time', time);
    res.status(200).json({ now: time });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export default handler;
