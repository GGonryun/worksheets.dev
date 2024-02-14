import { TRPCError } from '@trpc/server';
import { detailedRaffleSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      raffleId: z.number(),
    })
  )
  .output(detailedRaffleSchema)
  .query(async ({ input: { raffleId }, ctx: { db } }) => {
    console.info(`finding raffle ${raffleId}ssq`);
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
        participants: {
          include: {
            user: true,
          },
        },
        winners: {
          include: {
            user: true,
          },
        },
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
      costPerEntry: raffle.costPerEntry,
      monetaryValue: raffle.prize.monetaryValue,
      type: raffle.prize.type,
      sourceUrl: raffle.prize.sourceUrl,
      imageUrl: raffle.prize.imageUrl,
      numWinners: raffle.numWinners,
      participants: raffle.participants.map((p) => ({
        userId: p.user.id,
        username: p.user.username,
        numTickets: p.numTickets,
      })),
      winners: raffle.winners.map((w) => ({
        userId: w.userId,
        username: w.user.username,
      })),
      sponsor: {
        name: raffle.sponsor.name,
        url: raffle.sponsor.url,
      },
    };
  });
