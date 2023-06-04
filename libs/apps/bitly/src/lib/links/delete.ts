import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { auth } from '../common';
import { fetcher } from '@worksheets/util/http';

const { composer, bearer, method } = fetcher;

export const linksDelete = newMethod({
  path: 'bitly.links.delete',
  label: 'Delete Bitlink',
  description:
    'An unedited short link can be deleted using a DELETE call. An unedited short link refers to bitlinks that have not had its back-half customized or have not had its destination long URL changed.',

  settings: { auth },
  input: z.string().describe('The bitlink to be deleted. Eg: bit.ly/Gzmskv'),
  output: z.boolean(),

  async call({ settings, input }) {
    const result = await composer()(
      method('DELETE'),
      bearer(settings.auth.accessToken)
    )(`https://api-ssl.bitly.com/v4/bitlinks/${input}`);

    const data = await result.json();
    if (!result.ok) {
      const message = `bitly failed to delete a bitlink`;
      console.error(message);
      throw new MethodCallFailure({
        code: 500,
        message,
        data: data,
      });
    }
    console.info(`bitly deleted link '${input}' successfully`);
    return true;
  },
});
