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
                in: ['ACTIVE', 'WAITING', 'REASSIGN'],
              }
            : undefined,
        },
        userId: user.id,
      },
      select: {
        numEntries: true,
        raffle: {
          select: {
            id: true,
            status: true,
            expiresAt: true,
            prize: {
              select: {
                id: true,
                type: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    return participation.map((p) => ({
      id: p.raffle.id,
      type: p.raffle.prize.type,
      prizeId: p.raffle.prize.id,
      status: p.raffle.status,
      name: p.raffle.prize.name,
      imageUrl: p.raffle.prize.imageUrl,
      entries: p.numEntries,
      expiresAt: p.raffle.expiresAt.getTime(),
    }));
  });
