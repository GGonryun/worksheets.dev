import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const http = newApp({
  appId: 'http',
  label: 'HTTP Utilities',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/http.svg',
  description: 'Contains methods for executing HTTP requests.',
  context: z.null(),
  methods: {
    request: newMethod({
      appId: 'http',
      methodId: 'request',
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
  },
});
