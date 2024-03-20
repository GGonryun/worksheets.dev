import { TRPCError } from '@trpc/server';
import { detailedPrizeSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      prizeId: z.string(),
    })
  )
  .output(detailedPrizeSchema)
  .query(async ({ input: { prizeId }, ctx: { db } }) => {
    const prize = await db.prize.findFirst({
      where: {
        id: prizeId,
      },
      select: {
        id: true,
        name: true,
        type: true,
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

    if (!prize) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Prize not found',
      });
    }

    return {
      id: prize.id,
      name: prize.name,
      type: prize.type,
      imageUrl: prize.imageUrl,
      numRaffles: prize.raffles.length,
      headline: prize.headline,
      description: prize.description,
      sourceUrl: prize.sourceUrl,
    };
  });
