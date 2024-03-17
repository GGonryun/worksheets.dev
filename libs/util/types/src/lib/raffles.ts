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
  'newest' | 'expiring'
>;

export const raffleSchema = z.object({
  id: z.number(),
  prizeId: z.number(),
  name: z.string(),
  headline: z.string(),
  description: z.string(),
  expiresAt: z.number(),
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

export const participationSchema = z.object({
  userId: z.string(),
  username: z.string(),
  numTickets: z.number(),
});

export type ParticipationSchema = z.infer<typeof participationSchema>;

export const winnerSchema = z.object({
  userId: z.string(),
  username: z.string(),
});

export type WinnerSchema = z.infer<typeof winnerSchema>;

export type BasicRaffleDetails = Pick<
  RaffleSchema,
  'id' | 'name' | 'imageUrl' | 'type' | 'expiresAt'
>;

export type WonRaffleDetails = Pick<
  RaffleSchema,
  'name' | 'imageUrl' | 'type' | 'expiresAt'
> & {
  winnerId: string;
  raffleId: number;
  prizeId: number;
  ticketId: string;
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
  type: raffle.prize.type,
  sourceUrl: raffle.prize.sourceUrl,
  imageUrl: raffle.prize.imageUrl,
  numWinners: raffle.numWinners,
  sponsor: {
    name: raffle.sponsor.name,
    url: raffle.sponsor.url,
  },
});

export const enteredRaffleSchema = z.object({
  id: z.number(),
  type: z.nativeEnum(PrizeType),
  prizeId: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  entries: z.number(),
  expiresAt: z.number(),
});

export type EnteredRaffleSchema = z.infer<typeof enteredRaffleSchema>;
