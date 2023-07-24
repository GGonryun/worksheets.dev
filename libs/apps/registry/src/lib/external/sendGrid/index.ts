import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const sendEmail = newMethod({
  appId: 'sendGrid',
  methodId: 'sendEmail',
  label: 'Send Email',
  description: 'Send an email using SendGrid.',
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
  description:
    'SendGrid is a cloud-based email service that provides reliable transactional email delivery, scalability, and real-time analytics along with flexible APIs that make custom integration easy.',
  label: 'SendGrid',
  context: z.object({
    apiKey: z.string().describe('The API key for your SendGrid account.'),
  }),
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/sendgrid.svg',
  methods: {
    sendEmail,
  },
});
