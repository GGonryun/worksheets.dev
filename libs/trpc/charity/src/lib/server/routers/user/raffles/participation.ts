import { userParticipationSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      raffleId: z.number(),
    })
  )
  .output(userParticipationSchema)
  .query(async ({ input: { raffleId }, ctx: { db, user } }) => {
    const userId = user.id;

    const participation = await db.raffleParticipation.findFirst({
      where: {
        raffleId,
        userId,
      },
      select: {
        numEntries: true,
        winner: true,
        adsWatched: true,
      },
    });

    return {
      numEntries: participation?.numEntries ?? 0,
      userId: user.id,
      user: {
        username: user.username,
      },
      winner: participation?.winner ?? false,
      adsWatched: participation?.adsWatched ?? 0,
    };
  });
