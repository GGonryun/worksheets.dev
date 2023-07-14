import { z } from '@worksheets/zod';

export const modelSchema = z.object({
  id: z.string(),
  object: z.string(),
  owned_by: z.string(),
  permission: z.unknown(),
});
