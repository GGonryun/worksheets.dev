import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export default newApp({
  appId: 'gmail',
  context: z.object({
    accessToken: z.string(),
  }),
  methods: {
    sendEmail: newMethod({
      appId: 'gmail',
      methodId: 'sendEmail',
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
      appId: 'gmail',
      methodId: 'getUserEmail',
      input: z.null(),
      output: z.string(),
    }),
  },
});
