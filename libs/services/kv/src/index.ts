import { createClient as createVercelClient } from '@vercel/kv';

export const createClient = () => {
  return createVercelClient({
    url: process.env['KV_REST_API_URL'],
    token: process.env['KV_REST_API_TOKEN'],
  });
};
