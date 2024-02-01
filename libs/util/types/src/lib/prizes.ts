import { z } from 'zod';

export const prizeCategorySchema = z.enum([
  'all',
  'newest',
  'hottest',
  'cheapest',
  'qualified',
  'expiring',
]);

export type PrizeCategory = z.infer<typeof prizeCategorySchema>;

const company = z.union([z.literal('steam-games'), z.literal('epic-games')]);

export const prizeSchema = z.object({
  id: z.string(),
  title: z.string(),
  headline: z.string(),
  description: z.string(),
  value: z.number(),
  expires: z.number(),
  company: company,
  imageUrl: z.string(),
  entered: z.number(),
  tokens: z.number(),
});

export type PrizeSchema = z.infer<typeof prizeSchema>;

export type PrizeCompany = 'steam-games' | 'epic-games';

export type BasicPrizeDetails = {
  id: string;
  name: string;
  imageUrl: string;
  expires: number;
  company: PrizeCompany;
};
