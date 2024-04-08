import { z } from 'zod';

export const basicGameInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  cover: z.string(),
  plays: z.number(),
});

export type BasicGameInfo = z.infer<typeof basicGameInfoSchema>;

export type BasicCategoryInfo = {
  id: string;
  name: string;
  image: string;
};
