import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { auth, bitlinkSchema } from '../common';
import { ContentType, fetcher } from '@worksheets/util/http';

const { composer, bearer, content, method } = fetcher;

export const linksGet = newMethod({
  path: 'bitly.links.get',
  label: 'Retrieve Bitlink',
  description: 'Metadata for an existing short link.',

  settings: { auth },

  input: z
    .string()
    .describe(`The bitlink to retrieve information for. Eg: bit.ly/Gzmskv`),

  output: bitlinkSchema,

  async call({ settings, input }) {
    const result = await composer()(
      method('GET'),
      bearer(settings.auth.accessToken),
      content(ContentType.JSON)
    )(`https://api-ssl.bitly.com/v4/bitlinks/${input}`);
    console.info('bitly is getting url', input);
    if (!result.ok) {
      const message = `bitly failed to get bitlink metadata`;
      console.error(message);
      throw new MethodCallFailure({
        code: result.status,
        message: message,
      });
    }
    const data = await result.json();

    console.info(`bitly retrieved bitlink ${data.id} metadata`);
    return data;
  },
});
