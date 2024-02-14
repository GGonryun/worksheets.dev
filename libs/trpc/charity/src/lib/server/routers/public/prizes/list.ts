import { prizeSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      category: z.enum(['active', 'all']).optional(),
      filter: z.number().array().optional(),
    })
  )
  .output(prizeSchema.array())
  .query(async ({ input: { filter, category }, ctx: { db } }) => {
    // only show prizes that are in an active raffle
    const prizes = await db.prize.findMany({
      where: {
        id: {
          notIn: filter ? filter : [],
        },
        raffles:
          category === 'active'
            ? {
                some: {
                  expiresAt: {
                    gt: new Date(),
                  },
                },
              }
            : undefined,
      },
      include: {
        raffles: true,
      },
    });

    // sort by raffle count
    prizes.sort((a, b) => b.raffles.length - a.raffles.length);

    return prizes;
  });
