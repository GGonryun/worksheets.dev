import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const sendEmail = newMethod({
  appId: 'sendGrid',
  methodId: 'sendEmail',
  input: z.object({
    to: z.string(),
    from: z.string(),
    subject: z.string(),
    text: z.string(),
    html: z.string().optional(),
  }),
  output: z.object({
    id: z.string(),
  }),
});

export const sendGrid = newApp({
  appId: 'sendGrid',
  context: z.object({
    apiKey: z.string().describe('The API key for your SendGrid account.'),
  }),
  methods: {
    sendEmail,
  },
});
