import { TRPCError } from '@trpc/server';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

const notifications = new NotificationsService();

export default protectedProcedure
  .input(
    z.object({
      // friend object id not a user id
      friendshipId: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { friendshipId: id } }) => {
    const userId = user.id;
    const inventory = new InventoryService(db);

    console.info('user is sending gift to friend with id', { userId, id });

    const friendship = await db.friendship.findFirst({
      where: {
        id,
        userId, // makes sure the user owns the friendship.
      },
      select: {
        id: true,
        userId: true,
        friendId: true,
        friend: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!friendship) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A friendship does not exist. Add them as a friend first.',
      });
    }

    const sharableGiftBoxes = await inventory.quantity(
      userId,
      'small-box-of-tokens-offering'
    );

    if (sharableGiftBoxes <= 0) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You do not have any gifts to send.',
      });
    }

    const gift = await db.gift.findFirst({
      where: {
        friendshipId: friendship.id,
      },
    });

    if (gift) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `You've already sent a gift to ${friendship.friend.username}!`,
      });
    }

    await inventory.decrement(userId, 'small-box-of-tokens-offering', 1);
    await db.gift.create({
      data: {
        friendshipId: friendship.id,
      },
    });
    await inventory.increment(friendship.friendId, 'small-box-of-tokens', 1);
    await notifications.send('gift-received', {
      recipient: { id: friendship.friendId },
      sender: { username: user.username },
    });
  });
