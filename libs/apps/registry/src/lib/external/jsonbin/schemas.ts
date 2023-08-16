import { z } from '@worksheets/zod';

export const binId = z
  .string()
  .describe(
    'The Id of the record you wish to read. You can find the Id of the record on the record page.'
  );

export const metadata = z
  .object({
    id: z.string(),
    createdAt: z.string(),
    private: z.boolean(),
    collectionId: z.string().optional(),
  })
  .optional();
