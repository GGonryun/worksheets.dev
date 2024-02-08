import { z } from 'zod';

export const basicGameInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  plays: z.number(),
});

export type BasicGameInfo = z.infer<typeof basicGameInfoSchema>;
