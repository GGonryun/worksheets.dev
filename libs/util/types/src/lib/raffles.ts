import { Prisma, PrizeType } from '@prisma/client';
import { z } from 'zod';

export const raffleCategorySchema = z.enum([
  'all',
  'active',
  'suggested',
  'newest',
  'hottest',
  'expiring',
  'expired',
]);

export type RaffleCategory = z.infer<typeof raffleCategorySchema>;

export type FilterableRaffleCategory = Extract<
  RaffleCategory,
  'active' | 'newest' | 'hottest' | 'expiring'
>;

export const raffleSchema = z.object({
  id: z.string(),
  prizeId: z.string(),
  name: z.string(),
  headline: z.string(),
  description: z.string(),
  expiresAt: z.number(),
  costPerEntry: z.number(),
  monetaryValue: z.number(),
  type: z.nativeEnum(PrizeType),
  sourceUrl: z.string(),
  imageUrl: z.string(),
  numWinners: z.number(),
  sponsor: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export type RaffleSchema = z.infer<typeof raffleSchema>;

export type BasicRaffleDetails = Pick<
  RaffleSchema,
  'id' | 'name' | 'imageUrl' | 'type' | 'expiresAt'
>;

export type WonRaffleDetails = Pick<
  RaffleSchema,
  'name' | 'imageUrl' | 'type' | 'expiresAt'
> & {
  raffleId: string;
  prizeId: string;
  ticketId: string;
  claimBy: number;
  claimedAt?: number;
};

export const convertRaffle = (
  raffle: Prisma.RaffleGetPayload<{ include: { prize: true; sponsor: true } }>
): RaffleSchema => ({
  id: raffle.id,
  prizeId: raffle.prize.id,
  name: raffle.prize.name,
  headline: raffle.prize.headline,
  description: raffle.prize.description,
  expiresAt: raffle.expiresAt.getTime(),
  costPerEntry: raffle.costPerEntry,
  monetaryValue: raffle.prize.monetaryValue,
  type: raffle.prize.type,
  sourceUrl: raffle.prize.sourceUrl,
  imageUrl: raffle.prize.imageUrl,
  numWinners: raffle.numWinners,
  sponsor: {
    name: raffle.sponsor.name,
    url: raffle.sponsor.url,
  },
});
