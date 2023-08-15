import { newApp } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import createMessage from './createMessage';
import listMessages from './listMessages';

export default newApp({
  appId: 'twilio',
  context: z.object({
    sid: z.string().describe('Your Twilio account SID'),
    token: z.string().describe('Your Twilio auth token'),
    phone: z.string().describe('Your virtual number'),
  }),
  methods: {
    createMessage,
    listMessages,
  },
});
