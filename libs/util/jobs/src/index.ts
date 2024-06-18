import {
  CHARITY_GAMES_BASE_URL,
  CRON_SECRET,
} from '@worksheets/services/environment';
import { IS_PRODUCTION } from '@worksheets/ui/env';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const startBackgroundJob = (path: string, body: any) => {
  const baseUrl = CHARITY_GAMES_BASE_URL;

  console.log('Executing job', path, body);

  fetch(`${baseUrl}/api/jobs/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + CRON_SECRET,
    },
    body: JSON.stringify(body),
  })
    .then(() => {
      console.log(`Finished background job ${path}`);
    })
    .catch((error) => {
      console.error('Failed to process job', error);
    });
};

export const createBackgroundJob = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (path: string[], body: any) => Promise<any>
) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const authHeader = request.headers['authorization'];

    // allow insecure requests in development
    if (IS_PRODUCTION) {
      if (authHeader !== `Bearer ${CRON_SECRET}`) {
        return response.status(401).json({ success: false });
      }
    }

    const path = request.query['path'] as string[];
    const body = request.body;

    try {
      const result = await fn(path, body);
      console.info('Background job executed', path, result);
      response.status(204).end();
    } catch (error) {
      console.error('Background job failed', error);
      response.status(500).json({ success: false });
    }
  };
};
