import { z } from '@worksheets/zod';

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
