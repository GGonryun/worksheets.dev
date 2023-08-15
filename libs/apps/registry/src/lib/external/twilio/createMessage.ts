import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { messageSchema } from './schemas';

export default newMethod({
  appId: 'twilio',
  methodId: 'createMessage',
  input: z.object({
    to: z
      .string()
      .describe(
        "The destination phone number. Format with a '+' and country code e.g., +16175551212 (E.164 format)."
      ),
    body: z.string().describe('The text of the message you want to send.'),
  }),
  output: messageSchema,
});
