import { newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { saveOAuthSetting } from '@worksheets/feat/execution-settings';

const input = z.any();
const output = z.any();

export const global = newPublicHandler({ input, output })(
  async ({ res, req }) => {
    const { query, url } = req;

    const result = await saveOAuthSetting(url, query['state'] as string);

    res.status(302).redirect(result.url);

    console.info(`save oauth result handled`, result);

    return;
  }
);
