import { prizeSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      category: z.enum(['active', 'all']).optional(),
    })
  )
  .output(prizeSchema.array())
  .query(async ({ input: { category }, ctx: { db } }) => {
    // only show prizes that are in an active raffle
    const prizes = await db.prize.findMany({
      include: {
        raffles: {
          where:
            category === 'active'
              ? {
                  expiresAt: {
                    gte: new Date(),
                  },
                }
              : {},
        },
      },
    });

    // sort by raffle count
    prizes.sort((a, b) => b.raffles.length - a.raffles.length);

    return prizes;
  });
