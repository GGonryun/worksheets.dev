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
        purchased: true,
      },
    });

    return {
      numEntries: participation?.numEntries ?? 0,
      userId: user.id,
      user: {
        id: user.id,
        username: user.username,
      },
      purchased: participation?.purchased ?? 0,
      winner: participation?.winner ?? false,
    };
  });
