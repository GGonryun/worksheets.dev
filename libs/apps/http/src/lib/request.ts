import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const request = newMethod({
  label: 'request',
  description:
    'Sends an HTTP request to the specified URL, body should be stringified',
  input: z.object({
    url: z.string(),
    method: z
      .union([z.literal('GET'), z.literal('POST'), z.literal('DELETE')])
      .optional(),
    headers: z.record(z.string()).optional(),
    body: z.string().optional(),
  }),
  output: z.object({
    url: z.string(),
    code: z.number(),
    body: z.any(),
  }),
  async call(ctx) {
    const { url, method, headers, body } = ctx.input;
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return {
      url: response.url,
      code: response.status,
      body: await response.json(),
    };
  },
});
