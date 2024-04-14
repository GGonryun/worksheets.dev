import { FriendshipService } from '@worksheets/services/friendship';
import { NotificationsService } from '@worksheets/services/notifications';
import { QuestsService } from '@worksheets/services/quests';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      code: z.string(), // the referral code is used as a friend code too
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { code } }) => {
    const notifications = new NotificationsService(db);
    const quests = new QuestsService(db);
    const friends = new FriendshipService(db);

    const friend = await friends.parseFriendCode(code);
    const friendId = friend.user.id;

    await Promise.allSettled([
      friends.follow(user.id, friendId),
      quests.trackId({
        questId: 'ADD_FRIEND_INFINITE',
        userId: user.id,
        input: {
          userId: friendId,
        },
      }),
      notifications.send('new-follower', {
        user: friend.user,
        follower: user,
      }),
    ]);
  });
