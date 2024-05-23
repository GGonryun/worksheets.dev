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
      itemId: z.string().optional(),
      query: z.string().optional(),
      limit: z.number().optional(),
    })
  )
  .output(z.array(raffleSchema))
  .query(
    async ({
      input: { category, query, itemId, limit = DEFAULT_LIMIT },
      ctx: { db },
    }) => {
      const raffles = await getRaffles(db, category, limit, itemId);

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

type RaffleQuery = (
  db: PrismaClient,
  limit: number,
  itemId?: string
) => Promise<RaffleSchema[]>;

const getRaffles = (
  db: PrismaClient,
  category: RaffleCategory,
  limit: number,
  itemId?: string
): Promise<RaffleSchema[]> => {
  switch (category) {
    case 'active':
      return activePrizes(db, limit, itemId);
    case 'suggested':
    case 'hottest':
      return hottestPrizes(db, limit, itemId);
    case 'newest':
      return newestPrizes(db, limit, itemId);
    case 'expiring':
      return expiringPrizes(db, limit, itemId);
    case 'expired':
      return expiredPrizes(db, limit, itemId);
    case 'not-expired':
      return notExpiredPrizes(db, limit, itemId);
    case 'all':
      return allRaffles(db, limit, itemId);
    default:
      return allRaffles(db, limit, itemId);
  }
};

const allRaffles: RaffleQuery = async (db, limit, itemId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        itemId: itemId ? itemId : undefined,
      },
      include: {
        item: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const activePrizes: RaffleQuery = async (db, limit, itemId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        itemId: itemId ? itemId : undefined,
        status: 'ACTIVE',
      },
      include: {
        item: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const hottestPrizes: RaffleQuery = async (db, limit, itemId) => {
  const raffles = await db.raffle.findMany({
    take: limit,
    where: {
      itemId: itemId ? itemId : undefined,
      status: 'ACTIVE',
    },
    orderBy: {
      participants: {
        _count: 'desc',
      },
    },
    include: {
      item: true,
      sponsor: true,
      participants: true,
    },
  });

  return raffles.map(convertRaffle);
};

const newestPrizes: RaffleQuery = async (db, limit, itemId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        itemId: itemId ? itemId : undefined,
        status: 'ACTIVE',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        item: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const expiredPrizes: RaffleQuery = async (db, limit, itemId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        itemId: itemId ? itemId : undefined,
        status: {
          in: ['CANCELLED', 'COMPLETE'],
        },
      },
      orderBy: {
        expiresAt: 'asc',
      },
      include: {
        item: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const notExpiredPrizes: RaffleQuery = async (db, limit, itemId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        itemId: itemId ? itemId : undefined,
        status: {
          notIn: ['CANCELLED', 'COMPLETE'],
        },
      },
      orderBy: {
        expiresAt: 'asc',
      },
      include: {
        item: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const expiringPrizes: RaffleQuery = async (db, limit, itemId) =>
  (
    await db.raffle.findMany({
      take: limit,
      where: {
        itemId: itemId ? itemId : undefined,
        status: 'ACTIVE',
      },
      orderBy: {
        expiresAt: 'asc',
      },
      include: {
        item: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);
