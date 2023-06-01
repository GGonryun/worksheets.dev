import { newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { newPublicDatabase } from '../data-access/public-db';

const input = z.any();
const output = z.any();

export const global = newPublicHandler({ input, output })(
  async ({ res, req }) => {
    const { query, url } = req;
    const db = newPublicDatabase();

    const result = await db.settings.saveOAuth(url, query.state as string);

    res.status(302).redirect(result.url);

    console.info(`save oauth result handled`, result);

    return;
  }
);
