import {
  GAME_TRACK_KEY,
  GameTrackSchema,
  USER_GAME_TRACK_KEY,
} from '@worksheets/services/tracks';
import { GAME_TRACK_FREQUENCY_SECONDS } from '@worksheets/util/settings';
import { SECONDS } from '@worksheets/util/time';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

const CHEAT_DETECTION_THRESHOLD = 1.05;

export default t.router({
  track: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        duration: z.number(), // in seconds
      })
    )
    .mutation(async ({ input: { duration, gameId }, ctx: { user, kv } }) => {
      const now = Date.now();
      const opts = { gameId, userId: user.id };
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

      // set the new duration
      tracking.duration += duration;
      tracking.lastUpdated = now;
      await kv.set(USER_GAME_TRACK_KEY(opts), tracking);
    }),
});
