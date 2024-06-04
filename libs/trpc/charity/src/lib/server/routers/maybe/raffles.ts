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
        take: 1000, // limit to 1000 participants
        select: {
          numEntries: true,
          winner: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
      return participants;
    }),
});
