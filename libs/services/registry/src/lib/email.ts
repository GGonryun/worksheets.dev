import { newEndpoint, newService } from '@worksheets/services-core';
import { z } from '@worksheets/zod';

const commonEmailSchema = z.object({
  from: z.string().optional(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  overrides: z.record(z.any()),
});

const send = newEndpoint({
  id: 'send',
  title: 'Send Email',
  subtitle: 'Send an email to a recipient',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/email/send.svg',
  input: commonEmailSchema,
  output: z.object({
    messageId: z.string(),
  }),
  providers: ['gmail', 'sendGrid'],
});

export const email = newService({
  id: 'email',
  title: 'Email',
  subtitle: 'Send and receive emails from your app',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/email/email.svg',
  category: 'communication',
  providers: ['gmail', 'sendGrid'],
  endpoints: {
    send,
  },
});
