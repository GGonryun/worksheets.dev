import { enteredRaffleSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      activeOnly: z.boolean(),
    })
  )
  .output(enteredRaffleSchema.array())
  .query(async ({ input: { activeOnly }, ctx: { db, user } }) => {
    const participation = await db.raffleParticipation.findMany({
      where: {
        raffle: {
          status: activeOnly
            ? {
                in: ['ACTIVE'],
              }
            : undefined,
        },
        userId: user.id,
      },
      include: {
        raffle: {
          include: {
            prize: true,
          },
        },
      },
    });

    return participation.map((p) => ({
      id: p.raffle.id,
      type: p.raffle.prize.type,
      status: p.raffle.status,
      name: p.raffle.prize.name,
      imageUrl: p.raffle.prize.imageUrl,
      entries: p.numEntries,
      expiresAt: p.raffle.expiresAt.getTime(),
    }));
  });
