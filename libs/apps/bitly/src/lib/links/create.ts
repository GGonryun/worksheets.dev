import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { auth } from '../common';
import { ContentType, fetcher } from '@worksheets/util/http';

const { composer, bearer, content, method, json } = fetcher;

export const linksCreate = newMethod({
  path: 'bitly.links.create',
  label: 'Create Bitly short link',
  description:
    'The most basic call to shorten a link is using the POST method to the /v4/shorten endpoint.',

  settings: { auth },

  input: z.object({
    group: z.string(),
    url: z.string(),
  }),

  output: z.object({ id: z.string(), link: z.string() }),

  async call({ settings, input }) {
    const payload = { group_guid: input.group, long_url: input.url };

    const result = await composer()(
      method('POST'),
      bearer(settings.auth.accessToken),
      content(ContentType.JSON),
      json(payload)
    )('https://api-ssl.bitly.com/v4/shorten');
    const data = await result.json();

    if (!result.ok) {
      const message = `bitly failed to create a short url`;
      console.error(message);
      throw new MethodCallFailure({
        code: result.status,
        message,
        data: data,
      });
    }

    return { id: data['id'], link: data['link'] };
  },
});
