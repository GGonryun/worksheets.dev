import { Prisma } from '@worksheets/prisma';
import { PrizeSchema, prizeSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

const SUGGESTED_PRIZE_PROPS = {
  id: true as const,
  name: true as const,
  type: true as const,
  imageUrl: true as const,
};

export default publicProcedure
  .input(
    z.object({
      prizeId: z.string(),
    })
  )
  .output(
    z.object({
      similar: prizeSchema.array(),
      active: prizeSchema.array(),
    })
  )
  .query(async ({ input: { prizeId }, ctx: { db } }) => {
    const activePrizes = await db.prize.findMany({
      where: {
        id: {
          not: prizeId,
        },
        raffles: {
          some: {
            expiresAt: {
              gt: new Date(),
            },
          },
        },
      },
      select: {
        ...SUGGESTED_PRIZE_PROPS,
        raffles: {
          select: {
            expiresAt: true,
          },
        },
      },
    });

    const allPrizes = await db.prize.findMany({
      where: {
        id: {
          notIn: [...activePrizes.map((prize) => prize.id), prizeId],
        },
      },
      select: SUGGESTED_PRIZE_PROPS,
    });

    return {
      active: activePrizes.map(convertPrize),
      similar: allPrizes.map(convertPrize),
    };
  });

const convertPrize = (
  prize: Prisma.PrizeGetPayload<{ select: typeof SUGGESTED_PRIZE_PROPS }>
): PrizeSchema => ({
  id: prize.id,
  name: prize.name,
  type: prize.type,
  imageUrl: prize.imageUrl,
});
