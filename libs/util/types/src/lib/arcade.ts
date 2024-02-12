import { z } from 'zod';

export type PromotedGame = {
  href: string;
  image: string;
  name: string;
};

export const basicGameInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  plays: z.number(),
});

export type BasicGameInfo = z.infer<typeof basicGameInfoSchema>;

export type BasicCategoryInfo = {
  id: string;
  name: string;
  image: string;
};
