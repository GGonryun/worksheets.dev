import { z } from 'zod';

export const prizeCategorySchema = z.enum([
  'all',
  'newest',
  'hottest',
  'qualified',
  'expiring',
  'entered',
  'expired',
]);

export type PrizeCategory = z.infer<typeof prizeCategorySchema>;

const prizeType = z.union([
  z.literal('steam-key'),
  z.literal('epic-games-key'),
]);

export const prizeSchema = z.object({
  id: z.string(),
  title: z.string(),
  headline: z.string(),
  description: z.string(),
  expires: z.number(),
  value: z.number(),
  type: prizeType,
  sourceUrl: z.string(),
  imageUrl: z.string(),
  winners: z.number(),
  cost: z.number(),
  sponsor: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export type PrizeSchema = z.infer<typeof prizeSchema>;

export type PrizeType = z.infer<typeof prizeType>;

export type BasicPrizeDetails = {
  id: string;
  name: string;
  imageUrl: string;
  expires: number;
  type: PrizeType;
};
