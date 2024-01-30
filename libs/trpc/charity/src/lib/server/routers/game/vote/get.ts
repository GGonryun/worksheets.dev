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
  .output(voteSchema)
  .query(async ({ input: { gameId }, ctx: { user, db } }) => {
    const userId = user.id;

    console.info(`getting vote for game`, { gameId, userId });

    const vote = await db.gameVote.findFirst({
      where: { gameId, userId: user.id },
    });

    if (!vote) {
      return 'none';
    }

    console.info(`found vote for game`, { gameId, userId: user.id, vote });

    return vote.vote > 0 ? 'up' : 'down';
  });
