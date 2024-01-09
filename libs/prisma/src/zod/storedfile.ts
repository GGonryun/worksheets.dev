import * as z from 'zod';

export const StoredFileModel = z.object({
  id: z.string(),
  submissionId: z.string(),
  userId: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
