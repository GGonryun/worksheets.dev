import { TRPCError } from '@trpc/server';
import { InventoryService } from '@worksheets/services/inventory';
import { QuestsService } from '@worksheets/services/quests';
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      raffleId: z.number(),
      entries: z.number(),
    })
  )
  .output(z.unknown())
  .mutation(async ({ input: { raffleId, entries }, ctx: { db, user } }) => {
    const quests = new QuestsService(db);
    return db.$transaction(async (tx) => {
      const inventory = new InventoryService(tx);
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

      await inventory.decrement(user.id, {
        itemId: '1',
        quantity: RAFFLE_ENTRY_FEE * entries,
      });

      // create or update the participation
      await tx.raffleParticipation.upsert({
        where: {
          userId_raffleId: {
            raffleId: raffleId,
            userId: user.id,
          },
        },
        update: {
          numEntries: {
            increment: entries,
          },
        },
        create: {
          numEntries: entries,
          raffleId: raffleId,
          userId: user.id,
        },
      });

      await quests.trackId({
        questId: 'RAFFLE_PARTICIPATION_DAILY',
        userId: user.id,
        input: {},
      });
    });
  });
