import { CRON_SECRET } from '@worksheets/services/environment';
import { IS_PRODUCTION } from '@worksheets/ui/env';
import { NextApiRequest, NextApiResponse } from 'next';

export const createCronJob = (fn: () => Promise<unknown>) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const authHeader = request.headers['authorization'];

    // allow insecure requests in development
    if (IS_PRODUCTION) {
      if (authHeader !== `Bearer ${CRON_SECRET}`) {
        return response.status(401).json({ success: false });
      }
    }
    try {
      response.status(200).json({ success: true });
      await fn();
    } catch (error) {
      console.error('Cron Job Failed', error);
      response.status(500).json({ success: false });
    }
  };
};
