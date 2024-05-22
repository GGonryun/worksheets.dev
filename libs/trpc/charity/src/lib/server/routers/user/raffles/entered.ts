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
      select: {
        numEntries: true,
        raffle: {
          select: {
            id: true,
            status: true,
            expiresAt: true,
            imageUrl: true,
            item: {
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
      type: p.raffle.item.type,
      itemId: p.raffle.item.id,
      status: p.raffle.status,
      name: p.raffle.item.name,
      imageUrl: p.raffle.imageUrl ?? p.raffle.item.imageUrl,
      entries: p.numEntries,
      expiresAt: p.raffle.expiresAt.getTime(),
    }));
  });
