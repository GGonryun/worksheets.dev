import { z } from 'zod';

export const entitySchema = z.object({
  // atomic key
  id: z.string(),
});

export type Entity = z.infer<typeof entitySchema>;
