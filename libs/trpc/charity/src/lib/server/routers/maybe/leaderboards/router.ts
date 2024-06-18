import * as leaderboard from '@worksheets/services/leaderboards';
import {
  leaderboardFrequency,
  leaderboardPlayerSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  find: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
        frequency: leaderboardFrequency,
      })
    )
    .output(z.object({ players: leaderboardPlayerSchema.array() }))
    .query(async ({ ctx: { db }, input: { gameId, frequency } }) => {
      return await leaderboard.find(db, {
        gameId,
        frequency,
      });
    }),
});
