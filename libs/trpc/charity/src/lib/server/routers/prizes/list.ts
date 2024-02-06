import { PrismaClient } from '@prisma/client';
import {
  convertPrize,
  prizeCategorySchema,
  PrizeSchema,
  prizeSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      category: prizeCategorySchema,
      search: z.string().optional(),
    })
  )
  .output(z.array(prizeSchema))
  .query(({ input: { category }, ctx: { db } }) => {
    console.info(`listing prizes for category ${category}`);

    switch (category) {
      case 'active':
        return activePrizes(db);
      case 'suggested':
      case 'hottest':
        return hottestPrizes(db);
      case 'newest':
        return newestPrizes(db);
      case 'expiring':
        return expiringPrizes(db);
      case 'expired':
        return expiredPrizes(db);
      case 'all':
        return allPrizes(db);
      default:
        return allPrizes(db);
    }
  });

type PrizeQuery = (db: PrismaClient) => Promise<PrizeSchema[]>;

const allPrizes: PrizeQuery = async (db) =>
  (
    await db.rafflePrize.findMany({
      include: {
        sponsor: true,
      },
    })
  ).map(convertPrize);

const activePrizes: PrizeQuery = async (db) =>
  (
    await db.rafflePrize.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        sponsor: true,
      },
    })
  ).map(convertPrize);

const hottestPrizes: PrizeQuery = async (db) => {
  const prizes = await db.rafflePrize.findMany({
    orderBy: {
      monetaryValue: 'desc',
    },
    include: {
      sponsor: true,
    },
  });

  return prizes.map(convertPrize);
};

const newestPrizes: PrizeQuery = async (db) =>
  (
    await db.rafflePrize.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sponsor: true,
      },
    })
  ).map(convertPrize);

const expiredPrizes: PrizeQuery = async (db) =>
  (
    await db.rafflePrize.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        expiresAt: 'asc',
      },
      include: {
        sponsor: true,
      },
    })
  ).map(convertPrize);

const expiringPrizes: PrizeQuery = async (db) =>
  (
    await db.rafflePrize.findMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
      orderBy: {
        expiresAt: 'desc',
      },
      include: {
        sponsor: true,
      },
    })
  ).map(convertPrize);
