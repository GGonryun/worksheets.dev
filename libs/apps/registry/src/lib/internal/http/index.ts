import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const http = newApp({
  appId: 'http',
  context: z.null(),
  methods: {
    request: newMethod({
      appId: 'http',
      methodId: 'request',
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
  },
});
