import { Prize, Raffle } from '@prisma/client';
import { enteredRaffleSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      filter: z.enum(['all', 'active']),
    })
  )
  .output(enteredRaffleSchema.array())
  .query(async ({ input: { filter }, ctx: { db, user } }) => {
    console.info(`finding all entered raffles for user ${user.id}`);

    const raffleTickets = await db.raffleTicket.findMany({
      where: {
        raffle: {
          expiresAt:
            filter === 'active'
              ? {
                  gte: new Date(),
                }
              : undefined,
        },
        userId: user.id,
      },
      include: {
        raffle: {
          include: {
            sponsor: true,
            prize: true,
          },
        },
      },
    });

    const entriesPerRaffle = raffleTickets.reduce((acc, ticket) => {
      const raffleId = ticket.raffleId;
      if (acc[raffleId]) {
        acc[raffleId]++;
      } else {
        acc[raffleId] = 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const raffles = raffleTickets.reduce((acc, ticket) => {
      const raffleId = ticket.raffleId;
      if (acc[raffleId]) {
        return acc;
      }
      acc[raffleId] = ticket.raffle;
      return acc;
    }, {} as Record<string, Raffle>);

    const prizes = raffleTickets.reduce((acc, ticket) => {
      const raffleId = ticket.raffleId;
      if (acc[raffleId]) {
        return acc;
      }
      acc[raffleId] = ticket.raffle.prize;
      return acc;
    }, {} as Record<string, Prize>);

    return Object.entries(entriesPerRaffle).map(([raffleId, entries]) => ({
      id: raffleId,
      type: prizes[raffleId].type,
      prizeId: prizes[raffleId].id,
      name: prizes[raffleId].name,
      imageUrl: prizes[raffleId].imageUrl,
      entries,
      expiresAt: raffles[raffleId].expiresAt.getTime(),
    }));
  });
