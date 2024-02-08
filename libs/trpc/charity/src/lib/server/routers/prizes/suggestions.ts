import { detailedPrizeSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      prizeId: z.string().optional(),
    })
  )
  .output(detailedPrizeSchema.array())
  .query(async ({ input: { prizeId }, ctx: { db } }) => {
    const prizes = await db.prize.findMany({
      where: {
        id: {
          not: prizeId,
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
        monetaryValue: true,
        imageUrl: true,
        headline: true,
        description: true,
        sourceUrl: true,
        raffles: {
          where: {
            expiresAt: {
              gte: new Date(),
            },
          },
        },
      },
    });
    return prizes.map((prize) => ({
      id: prize.id,
      name: prize.name,
      type: prize.type,
      monetaryValue: prize.monetaryValue,
      imageUrl: prize.imageUrl,
      numRaffles: prize.raffles.length,
      headline: prize.headline,
      description: prize.description,
      sourceUrl: prize.sourceUrl,
    }));
  });
