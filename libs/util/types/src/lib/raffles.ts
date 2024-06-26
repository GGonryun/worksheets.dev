import { ItemType, Prisma, RaffleStatus } from '@worksheets/prisma';
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
  itemId: z.string(),
  name: z.string(),
  description: z.string(),
  headline: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
  status: z.nativeEnum(RaffleStatus),
  publishAt: z.number(),
  imageUrl: z.string(),
  numWinners: z.number(),
  type: z.nativeEnum(ItemType),
  maxEntries: z.number().nullable(),
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

export const userParticipationSchema = participationSchema.extend({
  purchased: z.number(),
});

export type UserParticipationSchema = z.infer<typeof userParticipationSchema>;

export type BasicRaffleDetails = Pick<
  RaffleSchema,
  'id' | 'name' | 'imageUrl' | 'expiresAt' | 'status' | 'type'
>;

export const convertRaffle = (
  raffle: Prisma.RaffleGetPayload<{ include: { item: true; sponsor: true } }>
): RaffleSchema => ({
  id: raffle.id,
  itemId: raffle.item.id,
  name: raffle.name ?? raffle.item.name,
  description: raffle.description ?? raffle.item.description,
  headline: raffle.headline ?? raffle.item.description,
  createdAt: raffle.createdAt.getTime(),
  expiresAt: raffle.expiresAt.getTime(),
  publishAt: raffle.publishAt?.getTime(),
  imageUrl: raffle.imageUrl ?? raffle.item.imageUrl,
  numWinners: raffle.numWinners,
  type: raffle.item.type,
  status: raffle.status,
  maxEntries: raffle.maxEntries,
  sponsor: {
    name: raffle.sponsor.name,
    logo: raffle.sponsor.logo,
    url: raffle.sponsor.url,
  },
});

export const enteredRaffleSchema = z.object({
  id: z.number(),
  itemId: z.string(),
  status: z.nativeEnum(RaffleStatus),
  name: z.string(),
  imageUrl: z.string(),
  entries: z.number(),
  expiresAt: z.number(),
  type: z.nativeEnum(ItemType),
});

export type EnteredRaffleSchema = z.infer<typeof enteredRaffleSchema>;
