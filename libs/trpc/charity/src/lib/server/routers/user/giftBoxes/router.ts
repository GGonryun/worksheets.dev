import { TRPCError } from '@trpc/server';
import { InventoryService } from '@worksheets/services/inventory';
import { TOKENS_IN_GIFT_BOX } from '@worksheets/util/settings';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  open: protectedProcedure.mutation(async ({ ctx: { user, db } }) => {
    await db.$transaction(async (tx) => {
      const inventory = new InventoryService(tx);

      const giftBoxes = await inventory.quantity(
        user.id,
        'small-box-of-tokens'
      );

      if (giftBoxes <= 0) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: "You don't have any gift boxes to open.",
        });
      }

      await inventory.decrement(user.id, 'small-box-of-tokens', 1);
      await inventory.increment(user.id, 'tokens', TOKENS_IN_GIFT_BOX);
    });
  }),
});
