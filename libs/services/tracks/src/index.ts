import { VercelKV } from '@vercel/kv';
import { Prisma, PrismaClient } from '@worksheets/prisma';
import { TasksService } from '@worksheets/services/tasks';
import { retryTransaction } from '@worksheets/util/prisma';
import { computeDateIsoString } from '@worksheets/util/time';
import { MakeNonNullable } from '@worksheets/util/types';
import { z } from 'zod';

export const GAME_TRACK_KEY = `game:tracking:*:*`;

export const USER_GAME_TRACK_KEY = (opts: {
  gameId: string;
  userId: string | null;
}) => `game:tracking:${opts.gameId}:${opts.userId}`;

export const gameTrackSchema = z.object({
  userId: z.string().nullable(),
  gameId: z.string(),
  duration: z.number(),
  lastUpdated: z.number(),
});

const computeGamePlayDurations = (
  tracks: GameTrackSchema[]
): Record<string, number> => {
  const gameDurations: Record<string, number> = {};
  for (const track of tracks) {
    const gameId = track.gameId;
    if (!gameDurations[gameId]) {
      gameDurations[gameId] = 0;
    }
    gameDurations[gameId] += track.duration;
  }
  return gameDurations;
};

export type GameTrackSchema = z.infer<typeof gameTrackSchema>;

export const processUserTracks = async (
  db: PrismaClient,
  tracks: GameTrackSchema[]
) => {
  for (const track of tracks) {
    try {
      const userId = track.userId;
      if (!userId) continue;
      await processUserTasks(db, { ...track, userId });
    } catch (error) {
      console.error('Failed to process user tracks', { error });
    }
  }
};

export const processGameTracks = async (
  db: PrismaClient,
  tracks: GameTrackSchema[]
) => {
  const gameDurations = computeGamePlayDurations(tracks);

  for (const [gameId, duration] of Object.entries(gameDurations)) {
    try {
      await db.game.update({
        where: {
          id: gameId,
        },
        data: {
          duration: {
            increment: duration,
          },
        },
      });
    } catch (error) {
      console.error(
        'Failed ot process game tracks',
        (error as Prisma.PrismaClientKnownRequestError).message
      );
    }
  }
};

export const processAnalyticsTracks = async (
  db: PrismaClient,
  tracks: GameTrackSchema[]
) => {
  const gameDurations = computeGamePlayDurations(tracks);

  for (const [gameId, duration] of Object.entries(gameDurations)) {
    try {
      const date = computeDateIsoString();

      await db.gamePlayAnalytics.upsert({
        where: {
          date_gameId: {
            date,
            gameId,
          },
        },
        create: {
          gameId,
          date,
          duration,
        },
        update: {
          duration: {
            increment: duration,
          },
        },
      });
    } catch (error) {
      console.error(
        'Failed to process analytics tracks',
        (error as Prisma.PrismaClientKnownRequestError).message
      );
    }
  }
};

export async function processUserTasks(
  db: PrismaClient,
  track: MakeNonNullable<GameTrackSchema, 'userId'>
) {
  const { gameId, userId, duration } = track;
  console.info('Processing user track', track);
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
    console.error('Failed to process user tasks', { error });
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
