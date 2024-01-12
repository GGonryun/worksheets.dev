import { castVoteSchema } from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(castVoteSchema)
  .output(
    z.object({
      success: z.boolean(),
    })
  )
  .mutation(async ({ input: { gameId, vote: rawVote }, ctx: { user, db } }) => {
    const userId = user.id;
    console.info(`casting vote for game`, { gameId, rawVote, userId });

    const existing = await db.gameVote.findFirst({
      where: {
        gameId,
        userId,
      },
    });

    const vote = rawVote === 'up' ? 1 : -1;

    if (existing) {
      console.info(`user has already voted for this game, updating vote`);
      await db.gameVote.update({
        where: {
          id: existing.id,
        },
        data: {
          vote,
        },
      });
    } else {
      console.info(`user has not voted for this game, creating vote`);
      await db.gameVote.create({
        data: {
          gameId,
          userId,
          vote,
        },
      });
    }
    console.info(`finished casting user game vote submission`);

    return { success: true };
  });
