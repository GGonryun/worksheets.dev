import { z } from 'zod';

export const gameInfoSchema = z.object({
  title: z.string(),
  url: z.string(),
});
export type GameInfo = z.infer<typeof gameInfoSchema>;

export const basicGameDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type BasicGameDetails = z.infer<typeof basicGameDetailsSchema>;
