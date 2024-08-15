import { VercelKV } from '@vercel/kv';
import {
  COMMON_ITEMS,
  DROP_LOTTERY,
  ItemId,
  UNCOMMON_ITEMS,
} from '@worksheets/data/items';
import { PrismaClient } from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { TasksService } from '@worksheets/services/tasks';
import { randomArrayElement, shuffle } from '@worksheets/util/arrays';
import { asyncEagerIterate, eagerIterate } from '@worksheets/util/generators';
import { isLucky } from '@worksheets/util/numbers';
import { retryTransaction } from '@worksheets/util/prisma';
import { PLAY_MINUTE_DROP_CHANCE } from '@worksheets/util/settings';
import { z } from 'zod';

import { gameCache, itemCache, userCache } from './caches';
import { UserItemQuantity, userItems } from './items';

export const GAME_TRACK_KEY = `game:tracking:*:*`;

export const USER_GAME_TRACK_KEY = (opts: { gameId: string; userId: string }) =>
  `game:tracking:${opts.gameId}:${opts.userId}`;

export const gameTrackSchema = z.object({
  userId: z.string(),
  gameId: z.string(),
  duration: z.number(),
  lastUpdated: z.number(),
});

export type GameTrackSchema = z.infer<typeof gameTrackSchema>;

export type LootNotification = {
  userId: string;
  gameId: string;
  itemId: string;
};

export const lootNotifications = () => {
  const notifications: LootNotification[] = [];

  const add = (opts: LootNotification) => {
    notifications.push(opts);
  };

  function* iterate() {
    for (const notification of notifications) {
      yield notification;
    }
  }

  return { add, iterate };
};

export async function gatherLoot(db: PrismaClient, tracks: GameTrackSchema[]) {
  const items = userItems();
  const notifications = lootNotifications();

  const loots = await asyncEagerIterate(generateLoot(db, tracks));

  loots.forEach((loot) => {
    items.add(loot.userId, loot.itemId, 1);
    notifications.add(loot);
  });

  return {
    loots: eagerIterate(items.iterate()),
    notifications: eagerIterate(notifications.iterate()),
  };
}

export async function* generateLoot(
  db: PrismaClient,
  tracks: GameTrackSchema[]
) {
  const users = userCache(db);

  for (const track of tracks) {
    const { userId, gameId } = track;
    const progress = await processUserTasks(db, track);
    if (!progress.length) {
      continue;
    }

    const quest = progress.find((p) => p.questId === 'PLAY_MINUTES_INFINITE');

    if (quest && quest.completions > 0) {
      const user = await users.safeGet(userId);

      if (!user) {
        console.warn('User not found', { userId });
        continue;
      }

      console.info('Searching for bonus loot', {
        userId,
        rolls: quest.completions,
        multiplier: user.multiplier,
      });

      const bonusLoot = generateBonusLoot(user.multiplier, quest.completions);

      for (const itemId of bonusLoot) {
        yield { userId, itemId, gameId };
      }
    }
  }
}

export async function processUserTasks(
  db: PrismaClient,
  { gameId, userId, duration }: GameTrackSchema
) {
  try {
    return await retryTransaction(db, async (tx) => {
      const tasks = new TasksService(tx);
      await tasks.trackGameActions({
        gameId,
        userId,
        repetitions: duration,
        type: 'PLAY_MINUTES',
      });
      return await tasks.trackGameQuests({
        gameId,
        userId,
        repetitions: duration,
        type: 'PLAY_MINUTES',
      });
    });
  } catch (error) {
    // failing to process a single task should not make the whole process fail
    console.error('Failed to track game progress', { error });
    return [];
  }
}

export async function* generateGameTracks(kv: VercelKV) {
  const trackingIds = await kv.sinter(GAME_TRACK_KEY);
  console.info('Flushing game sessions', { trackingIds });
  for (const trackingId of trackingIds) {
    const track = await kv.get<GameTrackSchema>(trackingId);

    if (!track) {
      console.error('Game session not found', { trackingId });
      continue;
    }

    yield track;

    await kv.del(trackingId);
  }
  await kv.del(GAME_TRACK_KEY);
}

export function* generateBonusLoot(multiplier: number, rolls: number) {
  const severityFactor = 1.25;
  const adjustedMultiplier = Math.pow(multiplier, severityFactor);

  const lottery = shuffle(getPlayerLottery(multiplier));
  for (let i = 0; i < rolls; i++) {
    if (isLucky(PLAY_MINUTE_DROP_CHANCE * adjustedMultiplier)) {
      yield randomArrayElement(lottery);
    }
  }
}

export async function rewardUsers(db: PrismaClient, loots: UserItemQuantity[]) {
  console.info('Rewarding users', { loots });
  for (const loot of loots) {
    console.info('Rewarding user', { loot });
    await retryTransaction(db, async (tx) => {
      const service = new InventoryService(tx);
      await service.increment(
        loot.userId,
        loot.itemId as ItemId,
        loot.quantity
      );
    });
  }
}

export async function sendNotifications(
  db: PrismaClient,
  notifications: LootNotification[]
) {
  const games = gameCache(db);
  const items = itemCache(db);

  console.info('Sending notifications', { notifications });
  // and send a notification to the user
  for (const notification of notifications) {
    console.info('Sending notification', { notification });
    const service = new NotificationsService(db);
    const item = await items.safeGet(notification.itemId);
    const game = await games.safeGet(notification.gameId);

    if (!item || !game) {
      console.error('Cannot send item or game not found', { notification });
      continue;
    }

    await service.send('found-item', {
      userId: notification.userId,
      item,
      game,
    });
  }
}

export const getPlayerLottery = (multiplier: number) => {
  if (multiplier < 0.75)
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
