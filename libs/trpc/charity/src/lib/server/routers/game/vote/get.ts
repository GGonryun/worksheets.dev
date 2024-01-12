import { voteSchema } from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

/**
 * Return the user's vote for a game
 */
export default protectedProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(
    z.object({
      success: z.boolean(),
      vote: voteSchema,
    })
  )
  .query(async ({ input: { gameId }, ctx: { user, db } }) => {
    const userId = user.id;

    console.info(`getting vote for game`, { gameId, userId });

    const vote = await db.gameVote.findFirst({
      where: { gameId, userId: user.id },
    });

    if (!vote) {
      return { success: true, vote: 'none' };
    }

    console.info(`found vote for game`, { gameId, userId: user.id, vote });

    return { success: true, vote: vote.vote > 0 ? 'up' : 'down' };
  });
