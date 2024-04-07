import { TRPCError } from '@trpc/server';
import { TOKENS_IN_GIFT_BOX } from '@worksheets/util/settings';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure.mutation(async ({ ctx: { user, db } }) => {
  const rewards = await db.rewards.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!rewards) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message:
        'No rewards found. Try again, or contact support if the error persists.',
    });
  }

  if (rewards.giftBoxes <= 0) {
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: "You don't have any gift boxes to open.",
    });
  }

  await db.rewards.update({
    where: {
      id: rewards.id,
    },
    data: {
      giftBoxes: {
        decrement: 1,
      },
      totalTokens: {
        increment: TOKENS_IN_GIFT_BOX,
      },
    },
  });
});
