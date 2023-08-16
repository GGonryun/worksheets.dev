import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { binId, metadata } from './schemas';

export default newMethod({
  appId: 'jsonbin',
  methodId: 'readBin',
  input: z.object({
    binId,
  }),
  output: z.object({
    data: z.any(),
    metadata,
  }),
});
