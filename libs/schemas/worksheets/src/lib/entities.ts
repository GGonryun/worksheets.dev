import { logLevelEntity } from '@worksheets/schemas-logging';
import { z } from '@worksheets/zod';

export const worksheetsEntitySchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  text: z.string(),
  description: z.string(),
  createdAt: z.number().describe('a unix ms timestamp'),
  updatedAt: z.number().describe('a unix ms timestamp'),
  timeout: z.number().describe('in seconds'),
  logLevel: logLevelEntity,
});
