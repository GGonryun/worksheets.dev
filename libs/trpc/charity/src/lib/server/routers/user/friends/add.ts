import { FriendshipService } from '@worksheets/services/friendship';
import { NotificationsService } from '@worksheets/services/notifications';
import { TasksService } from '@worksheets/services/tasks';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      // the referral code is used as a friend code too
      code: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input }) => {
    const notifications = new NotificationsService(db);
    const tasks = new TasksService(db);
    const friends = new FriendshipService(db);

    const friend = await friends.parseFriendCode(input.code);

    await friends.follow(user.id, friend.user.id);

    await Promise.allSettled([
      tasks.trackQuest({
        questId: 'ADD_FRIEND_INFINITE',
        userId: user.id,
        repetitions: 1,
        state: friend.user.id,
      }),
      notifications.send('new-follower', {
        user: friend.user,
        follower: user,
      }),
    ]);
  });
