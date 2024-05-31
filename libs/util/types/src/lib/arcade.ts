import { GameStatus } from '@prisma/client';
import { z } from 'zod';

export const basicGameInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  cover: z.string(),
  plays: z.number().nullable(),
});

export type BasicGameInfo = z.infer<typeof basicGameInfoSchema>;

export const detailedGameInfoSchema = basicGameInfoSchema.extend({
  status: z.nativeEnum(GameStatus),
  createdAt: z.number(),
  updatedAt: z.number(),
  publishAt: z.number().nullable(),
  plays: z.number(),
});

export type DetailedGameInfo = z.infer<typeof detailedGameInfoSchema>;

export type BasicCategoryInfo = {
  id: string;
  name: string;
  image: string;
};
