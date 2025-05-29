import { contestSchema, convertContest } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      includeExpired: z.boolean(),
    })
  )
  .output(z.array(contestSchema))
  .query(async ({ input: { includeExpired }, ctx: { db } }) => {
    const limit = 100; // Limit the number of contests returned
    const clause = includeExpired ? {} : { endAt: { gte: new Date() } };
    const contests = await db.contest.findMany({
      where: clause,
      take: limit,
      include: {
        game: true,
        prize: true,
        sponsor: true,
      },
    });

    return contests.map(convertContest);
  });
