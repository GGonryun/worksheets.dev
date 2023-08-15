import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { messageSchema } from './schemas';

export default newMethod({
  appId: 'twilio',
  methodId: 'listMessages',
  input: z.object({
    to: z.string().optional().describe('Filter by the destination number.'),
    from: z.string().optional().describe('Filter by the sender number.'),
    pageSize: z
      .number()
      .optional()
      .describe('The number of messages to return.'),
    dateSent: z
      .string()
      .optional()
      .describe('Filter by the date the message was sent.'),
  }),
  output: z.object({
    messages: z.array(messageSchema),
    pageSize: z.number(),
  }),
});
