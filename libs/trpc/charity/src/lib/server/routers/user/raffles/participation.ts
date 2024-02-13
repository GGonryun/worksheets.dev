import { raffleParticipation } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      raffleId: z.number(),
    })
  )
  .output(raffleParticipation)
  .query(async ({ input: { raffleId }, ctx: { db, user } }) => {
    const participation = await db.raffleParticipation.findFirst({
      where: {
        raffleId,
        userId: user.id,
      },
      select: {
        numTickets: true,
      },
    });

    if (!participation) {
      return {
        numTickets: 0,
        userId: user.id,
      };
    } else {
      return {
        numTickets: participation.numTickets,
        userId: user.id,
      };
    }
  });
