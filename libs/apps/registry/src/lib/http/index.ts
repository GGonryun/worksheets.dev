import { z } from '@worksheets/zod';
import { newApp, newMethod } from '../../framework';

export const http = newApp(
  {
    appId: 'http',
    label: 'HTTP Utilities',
    description: 'Utilities for working with HTTP requests and responses',
    context: z.null(),
  },
  {
    request: newMethod({
      label: 'HTTP Request',
      description:
        'Sends an HTTP request to the specified URL. Body should be stringified',
      input: z.object({
        url: z.string(),
        method: z
          .union([
            z.literal('GET'),
            z.literal('POST'),
            z.literal('PUT'),
            z.literal('DELETE'),
          ])
          .optional(),
        headers: z.record(z.string()).optional(),
        body: z.string().optional(),
      }),
      output: z.object({
        url: z.string(),
        code: z.number(),
        body: z.any(),
        headers: z.record(z.string().optional()).optional(),
      }),
    }),
  }
);
