import * as leaderboards from '@worksheets/services/leaderboards';
import {
  leaderboardFrequency,
  leaderboardPlayerSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  submit: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        score: z.number(),
      })
    )
    .output(
      z.object({
        tokens: z.number(),
        message: z.string(),
      })
    )
    .mutation(async ({ input: { sessionId, score }, ctx: { db, user } }) => {
      return await leaderboards.submitScore(db, {
        sessionId,
        userId: user.id,
        score,
      });
    }),
  participation: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        frequency: leaderboardFrequency,
      })
    )
    .output(leaderboardPlayerSchema.nullable())
    .query(async ({ ctx: { db, user }, input: { gameId, frequency } }) => {
      return await leaderboards.getParticipantRank(db, {
        gameId,
        userId: user.id,
        username: user.username,
        frequency,
      });
    }),
});
