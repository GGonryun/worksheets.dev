import {
  MethodCallFailure,
  newMethod,
  newOAuthSetting,
} from '@worksheets/apps/framework';
import { z } from 'zod';

export const auth = newOAuthSetting({
  required: false,
  options: {
    clientId: process.env['BITLY_APP_CLIENT_KEY'],
    clientSecret: process.env['BITLY_APP_SECRET_KEY'],
    authorizationUri: 'https://bitly.com/oauth/authorize',
    accessTokenUri: 'https://api-ssl.bitly.com/oauth/access_token',
  },
  schema: z.any(),
});

export const shortenUrl = newMethod({
  path: 'bitly.shorten',
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

    const result = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${settings.auth.access_token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await result.json();
    if (!result.ok) {
      const message = `bitly failed to create a short url`;
      console.error(message);
      throw new MethodCallFailure({
        code: 500,
        message,
        data: data,
      });
    }
    return { id: data['id'], link: data['link'] };
  },
});
