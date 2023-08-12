import { newService, newEndpoint } from '@worksheets/services-core';
import { z } from '@worksheets/zod';

const send = newEndpoint({
  id: 'send',
  title: 'Send SMS',
  subtitle: 'Send a text message',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/sms/send.svg',
  input: z.object({
    to: z.string(),
    message: z.string(),
  }),
  output: z.object({
    message: z.string(),
  }),
  providers: [],
});

export const sms = newService({
  id: 'sms',
  title: 'SMS',
  subtitle: 'Send text messages',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/sms/sms.svg',
  category: 'communication',
  providers: [],
  endpoints: {
    send,
  },
});
