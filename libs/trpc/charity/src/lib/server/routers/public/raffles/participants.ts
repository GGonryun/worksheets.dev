import { participationSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
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
      select: {
        numEntries: true,
        userId: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return participants.map((p) => ({
      numEntries: p.numEntries,
      userId: p.userId,
      username: p.user.username,
    }));
  });
