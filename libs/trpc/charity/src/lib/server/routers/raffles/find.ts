import { TRPCError } from '@trpc/server';
import { convertRaffle, raffleSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      raffleId: z.string(),
    })
  )
  .output(raffleSchema)
  .query(async ({ input: { raffleId }, ctx: { db } }) => {
    console.info(`finding raffle ${raffleId}ssq`);
    const raffle = await db.raffle.findFirst({
      where: {
        id: raffleId,
      },
      include: {
        sponsor: true,
        prize: true,
      },
    });

    if (!raffle)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Raffle not found' });

    return convertRaffle(raffle);
  });
