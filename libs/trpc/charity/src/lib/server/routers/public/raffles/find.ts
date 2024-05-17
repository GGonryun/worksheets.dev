import { TRPCError } from '@trpc/server';
import { convertRaffle, raffleSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      raffleId: z.number(),
    })
  )
  .output(raffleSchema)
  .query(async ({ input: { raffleId }, ctx: { db } }) => {
    const raffle = await db.raffle.findFirst({
      where: {
        id: raffleId,
      },
      include: {
        sponsor: true,
        item: true,
      },
    });

    if (!raffle)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Raffle not found' });

    console.log('Raffle Image', raffle.imageUrl);
    return convertRaffle(raffle);
  });
