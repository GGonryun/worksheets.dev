import { PrizeType } from '@prisma/client';
import { z } from 'zod';

export const prizeSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.nativeEnum(PrizeType),
  imageUrl: z.string(),
});

export type PrizeSchema = z.infer<typeof prizeSchema>;

export const detailedPrizeSchema = prizeSchema.extend({
  numRaffles: z.number(),
  headline: z.string(),
  description: z.string(),
  sourceUrl: z.string(),
});

export type DetailedPrizeSchema = z.infer<typeof detailedPrizeSchema>;

export type BasicPrizeDetails = Pick<
  PrizeSchema,
  'id' | 'name' | 'imageUrl' | 'type'
>;
