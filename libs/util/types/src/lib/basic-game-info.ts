import { z } from '@worksheets/zod';

export const basicGameInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export type BasicGameInfo = z.infer<typeof basicGameInfoSchema>;

export const detailedGameInfoSchema = basicGameInfoSchema.extend({
  plays: z.number(),
});

export type DetailedGameInfo = z.infer<typeof detailedGameInfoSchema>;
