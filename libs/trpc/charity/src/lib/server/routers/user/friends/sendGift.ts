import { TRPCError } from '@trpc/server';
import { FriendshipService } from '@worksheets/services/friendship';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      friendshipId: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { friendshipId } }) => {
    const userId = user.id;
    const inventory = new InventoryService(db);
    const notifications = new NotificationsService(db);
    const friendships = new FriendshipService(db);

    const sharableGiftBoxes = await inventory.quantity(userId, '3');

    if (sharableGiftBoxes <= 0) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You do not have any gifts to send.',
      });
    }

    const friendship = await friendships.createGift(friendshipId);

    await inventory.decrement(userId, '3', 1);
    await inventory.increment(friendship.friendId, '2', 1);
    await inventory.increment(user.id, '2', 1);

    await notifications.send('gift-received', {
      recipient: { id: friendship.friendId },
      sender: { username: user.username },
    });
  });
