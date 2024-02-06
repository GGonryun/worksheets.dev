import { Prisma, PrizeType } from '@prisma/client';
import { z } from 'zod';

export const prizeCategorySchema = z.enum([
  'all',
  'active',
  'suggested',
  'newest',
  'hottest',
  'expiring',
  'expired',
]);

export type PrizeCategory = z.infer<typeof prizeCategorySchema>;

export type FilterablePrizeCategory = Extract<
  PrizeCategory,
  'active' | 'newest' | 'hottest' | 'expiring'
>;

export const prizeSchema = z.object({
  id: z.string(),
  name: z.string(),
  headline: z.string(),
  description: z.string(),
  expiresAt: z.number(),
  costPerEntry: z.number(),
  monetaryValue: z.number(),
  type: z.custom<PrizeType>(),
  sourceUrl: z.string(),
  imageUrl: z.string(),
  numWinners: z.number(),
  sponsor: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export type PrizeSchema = z.infer<typeof prizeSchema>;

export type BasicPrizeDetails = Pick<
  PrizeSchema,
  'id' | 'name' | 'imageUrl' | 'type' | 'expiresAt'
>;

export type WonPrizeDetails = BasicPrizeDetails & {
  claimBy: number;
  claimedAt?: number;
};

export const convertPrize = (
  prize: Prisma.RafflePrizeGetPayload<{ include: { sponsor: true } }>
): PrizeSchema => ({
  ...prize,
  expiresAt: prize.expiresAt.getTime(),
  sponsor: {
    name: prize.sponsor.name,
    url: prize.sponsor.url,
  },
});
