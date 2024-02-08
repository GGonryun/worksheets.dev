import { PrismaClient } from '@prisma/client';
import {
  convertRaffle,
  RaffleCategory,
  raffleCategorySchema,
  RaffleSchema,
  raffleSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      prizeId: z.string().optional(),
      category: raffleCategorySchema,
      query: z.string().optional(),
    })
  )
  .output(z.array(raffleSchema))
  .query(async ({ input: { category, query, prizeId }, ctx: { db } }) => {
    console.info(`listing raffles for category ${category}`);

    const raffles = await getRaffles(db, category, prizeId);

    if (query) {
      return raffles.filter(
        (raffle) =>
          normalized(raffle.name).includes(normalized(query)) ||
          normalized(raffle.description).includes(normalized(query)) ||
          normalized(raffle.sponsor.name).includes(normalized(query))
      );
    }

    return raffles;
  });

const normalized = (text: string) => text.toLowerCase();

type RaffleQuery = (
  db: PrismaClient,
  prizeId?: string
) => Promise<RaffleSchema[]>;

const getRaffles = (
  db: PrismaClient,
  category: RaffleCategory,
  prizeId?: string
): Promise<RaffleSchema[]> => {
  switch (category) {
    case 'active':
      return activePrizes(db, prizeId);
    case 'suggested':
    case 'hottest':
      return hottestPrizes(db, prizeId);
    case 'newest':
      return newestPrizes(db, prizeId);
    case 'expiring':
      return expiringPrizes(db, prizeId);
    case 'expired':
      return expiredPrizes(db, prizeId);
    case 'all':
      return allRaffles(db, prizeId);
    default:
      return allRaffles(db, prizeId);
  }
};

const allRaffles: RaffleQuery = async (db, prizeId) =>
  (
    await db.raffle.findMany({
      where: {
        prizeId: prizeId ? prizeId : { not: '' },
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const activePrizes: RaffleQuery = async (db, prizeId) =>
  (
    await db.raffle.findMany({
      where: {
        prizeId: prizeId ? prizeId : { not: '' },
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);

const hottestPrizes: RaffleQuery = async (db, prizeId) => {
  const prizes = await db.raffle.findMany({
    where: {
      prizeId: prizeId ? prizeId : { not: '' },
    },
    orderBy: {
      prize: {
        monetaryValue: 'desc',
      },
    },
    include: {
      prize: true,
      sponsor: true,
    },
  });

  return prizes.map(convertRaffle);
};

const newestPrizes: RaffleQuery = async (db, prizeId) =>
  (
    await db.raffle.findMany({
      where: {
        prizeId: prizeId ? prizeId : { not: '' },
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

const expiredPrizes: RaffleQuery = async (db, prizeId) =>
  (
    await db.raffle.findMany({
      where: {
        prizeId: prizeId ? prizeId : { not: '' },
        expiresAt: {
          gt: new Date(),
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

const expiringPrizes: RaffleQuery = async (db, prizeId) =>
  (
    await db.raffle.findMany({
      where: {
        prizeId: prizeId ? prizeId : { not: '' },
        expiresAt: {
          lt: new Date(),
        },
      },
      orderBy: {
        expiresAt: 'desc',
      },
      include: {
        prize: true,
        sponsor: true,
      },
    })
  ).map(convertRaffle);
