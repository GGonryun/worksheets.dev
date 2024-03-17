import { TRPCError } from '@trpc/server';
import { raffleSchema } from '@worksheets/util/types';
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
    console.info(`finding raffle ${raffleId}`);
    const raffle = await db.raffle.findFirst({
      where: {
        id: raffleId,
        status: {
          not: 'DRAFT',
        },
      },
      include: {
        sponsor: true,
        prize: true,
      },
    });

    if (!raffle)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Raffle not found' });

    return {
      id: raffle.id,
      prizeId: raffle.prize.id,
      name: raffle.prize.name,
      headline: raffle.prize.headline,
      description: raffle.prize.description,
      expiresAt: raffle.expiresAt.getTime(),
      type: raffle.prize.type,
      sourceUrl: raffle.prize.sourceUrl,
      imageUrl: raffle.prize.imageUrl,
      numWinners: raffle.numWinners,
      sponsor: {
        name: raffle.sponsor.name,
        url: raffle.sponsor.url,
      },
    };
  });
