import { z } from '@worksheets/zod';
import { newApp, newMethod } from '../../framework';

export const http = newApp(
  {
    appId: 'gmail',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
    label: 'Gmail',
    description:
      'Gmail is a free email service provided by Google. As of 2019, it had 1.5 billion active users worldwide making it the largest email service in the world.',
    context: z.object({
      accessToken: z.string(),
    }),
  },
  {
    sendEmail: newMethod({
      label: 'Send Email',
      description: 'Send an email to a user from the current gmail account',
      input: z.object({
        to: z.string().email(),
        subject: z.string(),
        body: z.string(),
      }),
      output: z.object({
        to: z.string().email(),
        id: z.string(),
        sentAt: z.number(),
      }),
    }),
    getUserEmail: newMethod({
      label: 'Get User Email',
      description:
        'Returns the email associated with the current connection to gmail',
      input: z.null(),
      output: z.string(),
    }),
  }
);
