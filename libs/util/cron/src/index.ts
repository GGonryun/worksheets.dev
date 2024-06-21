import { CRON_SECRET } from '@worksheets/services/environment';
import { IS_PRODUCTION } from '@worksheets/ui/env';
import { NextApiRequest, NextApiResponse } from 'next';

export const createCronJob = (
  fn: (request: NextApiRequest, response: NextApiResponse) => Promise<unknown>
) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const authHeader = request.headers['authorization'];

    // allow insecure requests in development
    if (IS_PRODUCTION) {
      if (authHeader !== `Bearer ${CRON_SECRET}`) {
        return response.status(401).json({ success: false });
      }
    }
    try {
      await fn(request, response);
      response.status(200).json({ success: true });
    } catch (error) {
      console.error('Cron Job Failed', error);
      response.status(500).json({ success: false });
    }
  };
};
