import { TRPCError } from '@trpc/server';
import { Prisma } from '@worksheets/prisma';
import {
  GAME_TRACK_KEY,
  GameTrackSchema,
  USER_GAME_TRACK_KEY,
} from '@worksheets/services/tracks';
import {
  CHEAT_DETECTION_THRESHOLD,
  GAME_TRACK_FREQUENCY_SECONDS,
} from '@worksheets/util/settings';
import { computeDateIsoString, SECONDS } from '@worksheets/util/time';
import { z } from 'zod';

import { maybeProcedure, publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';
import achievements from './achievements';
import popularity from './popularity';

export default t.router({
  achievements,
  popularity,
  random: publicProcedure
    .input(
      z.object({
        isMobileOrTablet: z.boolean(),
        recentlyPlayed: z.string().array(),
      })
    )
    .output(
      z.object({
        id: z.string(),
      })
    )
    .query(
      async ({ input: { isMobileOrTablet, recentlyPlayed }, ctx: { db } }) => {
        // get a random game
        const game = await db.game.findMany({
          select: {
            id: true,
          },
          where: {
            status: 'PUBLISHED',
            viewport: {
              devices: {
                has: isMobileOrTablet ? 'MOBILE' : 'COMPUTER',
              },
            },
            id: {
              notIn: recentlyPlayed,
            },
          },
        });

        // get a random game
        const randomGame = game[Math.floor(Math.random() * game.length)];

        return {
          id: randomGame.id,
        };
      }
    ),
  record: maybeProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .mutation(async ({ input: { gameId }, ctx: { db, user } }) => {
      await db.game.update({
        where: {
          id: gameId,
        },
        data: {
          plays: {
            increment: 1,
          },
        },
      });

      const date = computeDateIsoString();

      try {
        await db.gamePlayAnalytics.upsert({
          where: {
            date_gameId: {
              date,
              gameId,
            },
          },
          create: {
            date,
            plays: 1,
            gameId,
          },
          update: {
            plays: {
              increment: 1,
            },
          },
        });
      } catch (error) {
        console.error(
          'Error upserting gamePlayAnalytics',
          (error as Prisma.PrismaClientKnownRequestError).message
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to record game play',
        });
      }

      if (user) {
        await db.gamePlayHistory.upsert({
          where: {
            gameId_userId: {
              gameId,
              userId: user.id,
            },
          },
          create: {
            gameId,
            userId: user.id,
            plays: 1,
          },
          update: {
            plays: {
              increment: 1,
            },
          },
        });
      }
    }),
  track: maybeProcedure
    .input(
      z.object({
        gameId: z.string(),
        duration: z.number(), // in seconds
      })
    )
    .mutation(async ({ input: { duration, gameId }, ctx: { user, kv } }) => {
      const now = Date.now();
      const opts = { gameId, userId: user?.id ?? '' };
      console.info('Tracking game time', { ...opts, duration });
      // set the key for flushing
      await kv.sadd(GAME_TRACK_KEY, USER_GAME_TRACK_KEY(opts));
      // check if we have a tracking record.
      const tracking: GameTrackSchema = (await kv.get<GameTrackSchema>(
        USER_GAME_TRACK_KEY(opts)
      )) ?? {
        ...opts,
        duration: 0,
        lastUpdated: 0,
      };

      // perform cheat detection for logged in users.
      if (user) {
        const timeSinceLastUpdate =
          (now - tracking.lastUpdated) * CHEAT_DETECTION_THRESHOLD;
        const maxAllowedDuration =
          GAME_TRACK_FREQUENCY_SECONDS * SECONDS * CHEAT_DETECTION_THRESHOLD;
        const userDuration = duration * SECONDS;
        const details = {
          ...tracking,
          timeSinceLastUpdate,
          maxAllowedDuration,
          userDuration,
        };
        // check to make sure we're not updating too frequently
        console.info('Current progress', details);

        if (timeSinceLastUpdate < userDuration) {
          console.error('Game tracking is too frequent', details);
          return;
        }
        if (userDuration > maxAllowedDuration) {
          console.error(
            'Game tracking is much longer than expected value',
            details
          );
          return;
        }
      }

      // set the new duration
      tracking.duration += duration;
      tracking.lastUpdated = now;
      await kv.set(USER_GAME_TRACK_KEY(opts), tracking);
    }),
});
