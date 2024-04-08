import { z } from 'zod';

export const gameInfoSchema = z.object({
  title: z.string(),
  url: z.string(),
});
export type GameInfo = z.infer<typeof gameInfoSchema>;
