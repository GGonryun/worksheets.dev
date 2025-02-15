import { Prisma, PrizeType, RaffleStatus } from '@worksheets/prisma';
import { z } from 'zod';

export const raffleCategorySchema = z.enum([
  'all',
  'active',
  'suggested',
  'newest',
  'hottest',
  'expiring',
  'expired',
  'not-expired',
]);

export type RaffleCategory = z.infer<typeof raffleCategorySchema>;

export type FilterableRaffleCategory = Extract<
  RaffleCategory,
  'newest' | 'expiring'
>;

export const raffleSchema = z.object({
  id: z.number(),
  type: z.nativeEnum(PrizeType),
  name: z.string(),
  description: z.string(),
  headline: z.string(),
  imageUrl: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
  status: z.nativeEnum(RaffleStatus),
  publishAt: z.number(),
  sponsor: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string(),
  }),
});

export type RaffleSchema = z.infer<typeof raffleSchema>;

export const participationSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
  winner: z.boolean(),
  numEntries: z.number(),
});

export type ParticipationSchema = z.infer<typeof participationSchema>;

export type BasicRaffleDetails = Pick<
  RaffleSchema,
  'id' | 'name' | 'imageUrl' | 'expiresAt' | 'status' | 'type'
>;

export const convertRaffle = (
  raffle: Prisma.RaffleGetPayload<{
    include: {
      sponsor: true;
      prize: true;
    };
  }>
): RaffleSchema => ({
  id: raffle.id,
  name: raffle.prize.name,
  description: raffle.prize.description,
  headline: raffle.prize.headline,
  createdAt: raffle.createdAt.getTime(),
  expiresAt: raffle.expiresAt.getTime(),
  publishAt: raffle.publishAt?.getTime(),
  imageUrl: raffle.prize.imageUrl,
  type: raffle.prize.type,
  status: raffle.status,
  sponsor: {
    name: raffle.sponsor.name,
    logo: raffle.sponsor.logo,
    url: raffle.sponsor.url,
  },
});

export const enteredRaffleSchema = z.object({
  id: z.number(),
  type: z.nativeEnum(PrizeType),
  status: z.nativeEnum(RaffleStatus),
  name: z.string(),
  imageUrl: z.string(),
  entries: z.number(),
  expiresAt: z.number(),
});

export type EnteredRaffleSchema = z.infer<typeof enteredRaffleSchema>;
