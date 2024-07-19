import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { InventoryService } from '@worksheets/services/inventory';
import { retryTransaction } from '@worksheets/util/prisma';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';
import { t } from '../../../../trpc';

export default t.router({
  send: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        itemId: z.string(),
        quantity: z.number(),
      })
    )
    .output(
      z.object({
        item: z.object({
          name: z.string(),
        }),
      })
    )
    .mutation(
      async ({ ctx: { db, user }, input: { sessionId, itemId, quantity } }) => {
        console.info('providing a user with a reward');
        const session = await db.gameSession.findUnique({
          where: {
            id: sessionId,
          },
        });

        if (!session) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Session not found',
          });
        }

        if (session.userId !== user.id) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Session does not belong to user',
          });
        }

        return retryTransaction(db, async (tx) => {
          const inventory = new InventoryService(tx);
          return await inventory.increment(user.id, itemId as ItemId, quantity);
        });
      }
    ),
});
