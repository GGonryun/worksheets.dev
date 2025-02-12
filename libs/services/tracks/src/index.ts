import { VercelKV } from '@vercel/kv';
import { PrismaClient } from '@worksheets/prisma';
import { TasksService } from '@worksheets/services/tasks';
import { retryTransaction } from '@worksheets/util/prisma';
import { z } from 'zod';

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
