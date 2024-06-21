import { TRPCError } from '@trpc/server';
import {
  COMMON_ITEMS,
  DROP_LOTTERY,
  ItemId,
  ITEMS,
  UNCOMMON_ITEMS,
} from '@worksheets/data/items';
import { Prisma, PrismaClient } from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { TasksService } from '@worksheets/services/tasks';
import { randomArrayElement, shuffle } from '@worksheets/util/arrays';
import { startBackgroundJob } from '@worksheets/util/jobs';
import { isLucky } from '@worksheets/util/numbers';
import { PLAY_MINUTE_DROP_CHANCE } from '@worksheets/util/settings';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  track: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        increment: z.number(), // in seconds
      })
    )
    .mutation(async ({ input: { increment, gameId }, ctx: { user, db } }) => {
      const tasks = new TasksService(db);
      const game = await db.game.findFirst({
        where: {
          id: gameId,
        },
        select: {
          id: true,
          title: true,
        },
      });

      if (!game) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Game not found',
        });
      }

      const referral = await db.user.findMany({
        where: {
          referredByUserId: user.id,
        },
        select: {
          id: true,
        },
      });

      const friends = await db.friendship.findMany({
        where: {
          userId: user.id,
          isFavorite: true,
        },
        select: {
          friendId: true,
        },
      });

      await Promise.allSettled([
        // reward my referrals when I play games.
        referral.map((r) =>
          tasks.trackQuest({
            questId: 'REFERRAL_PLAY_MINUTES_INFINITE',
            userId: r.id,
            repetitions: increment,
          })
        ),
        // reward my best friends when I play games.
        friends.map((f) =>
          tasks.trackQuest({
            questId: 'FRIEND_PLAY_MINUTES_INFINITE',
            userId: f.friendId,
            repetitions: increment,
          })
        ),
        startBackgroundJob('track/play/minutes', {
          gameId: game.id,
          userId: user.id,
          increment,
        }),
        bonusLoot(db, user, game),
      ]);
    }),
});

// TODO: In the long run we're planning to remove the time based rewards.
// for now since the default game tracking period is 60 seconds, we can
// synchronize rewards with it.
// TODO: protect bonus loot tracking with a rate limiter.
const bonusLoot = async (
  db: PrismaClient,
  user: { id: string; multiplier: number },
  game?: Prisma.GameGetPayload<{ select: { id: true; title: true } }>
) => {
  const { id: userId, multiplier } = user;
  console.info('Searching for bonus loot for infinite play minutes', {
    id: user.id,
    multiplier,
  });
  const inventory = new InventoryService(db);
  const notifications = new NotificationsService(db);
  const severityFactor = 1.25;
  const adjustedMultiplier = Math.pow(multiplier, severityFactor);

  if (!isLucky(PLAY_MINUTE_DROP_CHANCE * adjustedMultiplier)) {
    return;
  }

  const lottery = getPlayerLottery(multiplier);

  const itemId = randomArrayElement(shuffle(lottery));
  console.info('Awarding bonus loot for infinite play minutes', {
    itemId,
    userId,
  });
  await inventory.increment(userId, itemId as ItemId, 1);
  const item = ITEMS.find((i) => i.id === itemId);
  if (game && item) {
    const payload = {
      userId,
      item,
      game,
    };
    console.info('Sending notification for bonus loot', payload);
    await notifications.send('found-item', payload);
  } else {
    console.info('Could not find item or game for bonus loot', {
      itemId,
      userId,
      item,
      game,
    });
  }
};

const getPlayerLottery = (multiplier: number) => {
  if (multiplier < 1)
    return [
      ...COMMON_ITEMS.map((i) => i.id),
      ...UNCOMMON_ITEMS.map((i) => i.id),
    ].flat();

  return Object.entries(DROP_LOTTERY)
    .flatMap(([itemId, quantity]) => {
      return Array.from({ length: quantity }, () => itemId);
    })
    .flat();
};
