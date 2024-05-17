import { FriendshipService } from '@worksheets/services/friendship';
import { NotificationsService } from '@worksheets/services/notifications';
import { TasksService } from '@worksheets/services/tasks';
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
    const tasks = new TasksService(db);
    const friends = new FriendshipService(db);

    const friend = await friends.parseFriendCode(code);
    const friendId = friend.user.id;

    await friends.follow(user.id, friendId);

    await Promise.allSettled([
      // TODO: reward users when someone else follows them
      tasks.trackQuest({
        questId: 'ADD_FRIEND_INFINITE',
        userId: user.id,
        // TODO: prevent abuse, someone can remove and add friends to reach the maximum rewards.
        repetitions: 1,
      }),
      notifications.send('new-follower', {
        user: friend.user,
        follower: user,
      }),
    ]);
  });
