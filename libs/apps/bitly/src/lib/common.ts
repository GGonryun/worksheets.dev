import { newOAuthSetting } from '@worksheets/apps/framework';
import { ContentType, fetcher } from '@worksheets/util/http';
import { expireAfter } from '@worksheets/util/time';
import { z } from 'zod';

const { composer, accept, method } = fetcher;

export const bitlinkSchema = z.object({
  archived: z.boolean(),
  link: z.string(),
  references: z.object({ group: z.string() }),
  created_at: z.string(),
  id: z.string(),
  long_url: z.string(),
  created_by: z.string(),
  tags: z.array(z.string()),
});

export const BITLY_API_URL = `https://api-ssl.bitly.com`;

export const auth = newOAuthSetting({
  required: true,
  schema: z.object({ accessToken: z.string() }),
  options: {
    clientId: process.env['BITLY_APP_CLIENT_KEY'],
    clientSecret: process.env['BITLY_APP_SECRET_KEY'],
    authorizationUri: 'https://bitly.com/oauth/authorize',
    async parseUrlOverride(opts, code) {
      const request = composer()(method('POST'), accept(ContentType.JSON));

      const result = await request(
        `${BITLY_API_URL}/oauth/access_token?client_id=${
          opts.clientId
        }&client_secret=${opts.clientSecret}&redirect_uri=${encodeURIComponent(
          opts.redirectUri ?? ''
        )}&code=${encodeURIComponent(code)}`
      );

      const data = await result.json();

      return JSON.stringify({
        ...data,
        expiry: expireAfter({ days: 100 }), //100 days from now
      });
    },
  },
});
