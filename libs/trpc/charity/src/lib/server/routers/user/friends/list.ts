import { TRPCError } from '@trpc/server';
import { friendSchema } from '@worksheets/ui/pages/account';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      list: z.array(friendSchema),
      giftsRemaining: z.number(),
      code: z.string(), // code is the username for now.
    })
  )
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;
    console.info('finding user friendships', { userId });
    const friendships = await db.friendship.findMany({
      where: {
        userId,
      },
      include: {
        friend: {
          include: {
            plays: true,
          },
        },
      },
    });

    const rewards = await db.rewards.findFirst({
      where: {
        userId,
      },
    });

    if (!rewards) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Could not find user rewards. Contact support for assistance.',
      });
    }

    return {
      code: user.username,
      giftsRemaining: rewards.sharableGiftBoxes,
      list: friendships.map((friendship) => ({
        id: friendship.id,
        username: friendship.friend.username,
        // this is the last time they played a game or performed a reward action.
        lastSeen:
          friendship.friend.plays
            ?.sort(
              (a, b) =>
                // get latest game play
                b.updatedAt.getTime() - a.updatedAt.getTime()
            )
            .at(0)
            ?.updatedAt.getTime() ?? friendship.friend.createdAt.getTime(),
        gamesPlayed: friendship.friend.plays.reduce(
          (acc, curr) => acc + curr.total,
          0
        ),
        isFavorite: friendship.isFavorite,
        giftSentAt: friendship.giftSentAt?.getTime() ?? null,
      })),
    };
  });
