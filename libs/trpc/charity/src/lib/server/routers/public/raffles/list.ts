import { PrismaClient } from '@worksheets/prisma';
import {
  convertRaffle,
  RaffleCategory,
  raffleCategorySchema,
  RaffleSchema,
  raffleSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

const DEFAULT_LIMIT = 100;

export default publicProcedure
  .input(
    z.object({
      category: raffleCategorySchema,
      query: z.string().optional(),
      limit: z.number().optional(),
    })
  )
  .output(z.array(raffleSchema))
  .query(
    async ({
      input: { category, query, limit = DEFAULT_LIMIT },
      ctx: { db },
    }) => {
      const raffles = await getRaffles(db, category, limit);

      if (query) {
        return raffles.filter(
          (raffle) =>
            normalized(raffle.name).includes(normalized(query)) ||
            normalized(raffle.sponsor.name).includes(normalized(query))
        );
      }

      return raffles;
    }
  );

const normalized = (text: string) => text.toLowerCase();

type RaffleQuery = (db: PrismaClient, limit: number) => Promise<RaffleSchema[]>;

const getRaffles = (
  db: PrismaClient,
  category: RaffleCategory,
  limit: number
): Promise<RaffleSchema[]> => {
  switch (category) {
    case 'active':
      return activePrizes(db, limit);
    case 'suggested':
    case 'hottest':
      return hottestPrizes(db, limit);
    case 'newest':
      return newestPrizes(db, limit);
    case 'expiring':
      return expiringPrizes(db, limit);
    case 'expired':
      return expiredPrizes(db, limit);
    case 'not-expired':
      return notExpiredPrizes(db, limit);
    case 'all':
      return allRaffles(db, limit);
    default:
      return allRaffles(db, limit);
  }
};

const allRaffles: RaffleQuery = async (db, limit) =>
  (
    await db.raffle.findMany({
      take: limit,
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const activePrizes: RaffleQuery = async (db, limit) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        status: 'ACTIVE',
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const hottestPrizes: RaffleQuery = async (db, limit) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        status: 'ACTIVE',
      },
      orderBy: {
        participants: {
          _count: 'desc',
        },
      },
      include: {
        prize: true,
        sponsor: true,
        participants: true,
      },
    })
  ).map(convertRaffle);

const newestPrizes: RaffleQuery = async (db, limit) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        status: 'ACTIVE',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const expiredPrizes: RaffleQuery = async (db, limit) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        status: {
          in: ['CANCELLED', 'COMPLETE'],
        },
      },
      orderBy: {
        expiresAt: 'asc',
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const notExpiredPrizes: RaffleQuery = async (db, limit) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        status: {
          notIn: ['CANCELLED', 'COMPLETE'],
        },
      },
      orderBy: {
        expiresAt: 'asc',
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const expiringPrizes: RaffleQuery = async (db, limit) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        status: 'ACTIVE',
      },
      orderBy: {
        expiresAt: 'asc',
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);
