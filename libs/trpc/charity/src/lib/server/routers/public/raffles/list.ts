import { PrismaClient } from '@prisma/client';
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
      prizeId: z.number().optional(),
      query: z.string().optional(),
      limit: z.number().optional(),
    })
  )
  .output(z.array(raffleSchema))
  .query(
    async ({
      input: { category, query, prizeId, limit = DEFAULT_LIMIT },
      ctx: { db },
    }) => {
      console.info(`listing raffles for category ${category}`);

      const raffles = await getRaffles(db, category, limit, prizeId);

      if (query) {
        return raffles.filter(
          (raffle) =>
            normalized(raffle.name).includes(normalized(query)) ||
            normalized(raffle.headline).includes(normalized(query)) ||
            normalized(raffle.sponsor.name).includes(normalized(query))
        );
      }

      return raffles;
    }
  );

const normalized = (text: string) => text.toLowerCase();

type RaffleQuery = (
  db: PrismaClient,
  limit: number,
  prizeId?: number
) => Promise<RaffleSchema[]>;

const getRaffles = (
  db: PrismaClient,
  category: RaffleCategory,
  limit: number,
  prizeId?: number
): Promise<RaffleSchema[]> => {
  switch (category) {
    case 'active':
      return activePrizes(db, limit, prizeId);
    case 'suggested':
    case 'hottest':
      return hottestPrizes(db, limit, prizeId);
    case 'newest':
      return newestPrizes(db, limit, prizeId);
    case 'expiring':
      return expiringPrizes(db, limit, prizeId);
    case 'expired':
      return expiredPrizes(db, limit, prizeId);
    case 'all':
      return allRaffles(db, limit, prizeId);
    default:
      return allRaffles(db, limit, prizeId);
  }
};

const allRaffles: RaffleQuery = async (db, limit, prizeId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        prizeId: prizeId ? prizeId : undefined,
        status: {
          notIn: ['CANCELLED', 'DRAFT'],
        },
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const activePrizes: RaffleQuery = async (db, limit, prizeId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        prizeId: prizeId ? prizeId : undefined,
        status: 'ACTIVE',
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const hottestPrizes: RaffleQuery = async (db, limit, prizeId) => {
  const prizes = await db.raffle.findMany({
    take: limit,
    where: {
      prizeId: prizeId ? prizeId : undefined,
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
  });

  return prizes.map(convertRaffle);
};

const newestPrizes: RaffleQuery = async (db, limit, prizeId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        prizeId: prizeId ? prizeId : undefined,
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

const expiredPrizes: RaffleQuery = async (db, limit, prizeId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        prizeId: prizeId ? prizeId : undefined,
        status: 'COMPLETE',
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

const expiringPrizes: RaffleQuery = async (db, limit, prizeId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        prizeId: prizeId ? prizeId : undefined,
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