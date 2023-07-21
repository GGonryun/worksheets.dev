import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const discord = newApp({
  appId: 'discord',
  logo: '',
  label: 'Discord',
  description:
    'Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.',
  context: z.null(),
  methods: {
    sendMessage: newMethod({
      appId: 'discord',
      methodId: 'sendMessage',
      label: '[Webhook] Send Message',
      description: 'Send a message to a specific channel using a webhook',
      input: z.object({
        content: z
          .string()
          .describe('the message contents (up to 2000 characters'),
        username: z
          .string()
          .describe('override the default username of the webhook'),
      }),
      output: z.object({
        boolean: z.boolean().describe('returns true if the message was sent'),
      }),
    }),
  },
});
