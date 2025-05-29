import { TRPCError } from '@trpc/server';
import { contestSchema, convertContest } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      contestId: z.number(),
    })
  )
  .output(contestSchema)
  .query(async ({ input: { contestId }, ctx: { db } }) => {
    const contest = await db.contest.findFirst({
      where: {
        id: contestId,
      },
      include: {
        sponsor: true,
        prize: true,
        game: true,
      },
    });

    if (!contest)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Contest not found' });

    return convertContest(contest);
  });
