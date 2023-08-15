import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { sentBatchSchema } from './schemas';

export default newMethod({
  appId: 'sinch',
  methodId: 'listBatches',
  input: z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
    from: z
      .string()
      .optional()
      .describe('Only list messages sent from this sender number'),
    startDate: z
      .string()
      .optional()
      .describe('Only list messages sent after this date'),
    endDate: z
      .string()
      .optional()
      .describe('Only list messages sent before this date'),
  }),
  output: z.object({
    page: z.number().optional().describe('The page you requested'),
    pageSize: z.number().optional().describe('The page size you requested'),
    count: z
      .number()
      .optional()
      .describe('The total number of entries across all batches'),
    batches: z
      .array(sentBatchSchema)
      .describe('The list of batches you requested'),
  }),
});
