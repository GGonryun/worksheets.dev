import { participationSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  participants: publicProcedure
    .input(
      z.object({
        raffleId: z.number(),
      })
    )
    .output(participationSchema.array())
    .query(async ({ ctx: { db }, input: { raffleId } }) => {
      const participants = await db.raffleParticipation.findMany({
        where: {
          raffleId,
        },
        orderBy: {
          numEntries: 'desc',
        },
        take: 100,
        select: {
          numEntries: true,
          userId: true,
          winner: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      });
      return participants;
    }),
});
