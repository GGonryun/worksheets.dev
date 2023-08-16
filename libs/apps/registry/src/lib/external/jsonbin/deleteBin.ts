import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { binId } from './schemas';

export default newMethod({
  appId: 'jsonbin',
  methodId: 'deleteBin',
  input: z.object({
    binId,
  }),

  output: z.object({
    metadata: z
      .object({
        id: z.string(),
        versionsDeleted: z.number(),
      })
      .optional(),
    message: z
      .string()
      .describe('Message from the server or an error message.'),
  }),
});
