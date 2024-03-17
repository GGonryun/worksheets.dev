import { TRPCError } from '@trpc/server';
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      raffleId: z.number(),
    })
  )
  .output(z.unknown())
  .mutation(async ({ input: { raffleId }, ctx: { db, user } }) => {
    return db.$transaction(async (tx) => {
      // get the prize to compute the cost.
      const raffle = await db.raffle.findFirst({
        where: {
          id: raffleId,
        },
      });

      if (!raffle) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Raffle does not exist',
        });
      }

      if (raffle.status !== 'ACTIVE') {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Raffle is not active',
        });
      }

      if (raffle.expiresAt < new Date()) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Raffle has expired',
        });
      }

      // purchase the tickets
      const result = await tx.rewards.update({
        where: {
          userId: user.id,
        },
        data: {
          totalTokens: {
            decrement: RAFFLE_ENTRY_FEE,
          },
        },
      });

      // check if the user has enough tokens to purchase the tickets
      if (result.totalTokens < 0) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'User has insufficient tokens to purchase tickets',
        });
      }

      // create or update the participation
      await tx.raffleParticipation.upsert({
        where: {
          userId_raffleId: {
            raffleId: raffleId,
            userId: user.id,
          },
        },
        update: {
          numTickets: {
            increment: 1,
          },
        },
        create: {
          numTickets: 1,
          raffleId: raffleId,
          userId: user.id,
        },
      });
    });
  });
