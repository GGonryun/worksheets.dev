import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { binId, metadata } from './schemas';

export default newMethod({
  appId: 'jsonbin',
  methodId: 'updateBin',
  input: z.object({
    binId,
    data: z
      .any()
      .describe(
        'The data you wish to store in the record. It can be any JSON data.'
      ),
  }),
  output: z.object({
    data: z.any().optional().describe('The updated record.'),
    metadata,
  }),
});
