import { castVoteSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(castVoteSchema)
  .output(
    z.object({
      success: z.boolean(),
    })
  )
  .mutation(async ({ input: { gameId, vote: rawVote }, ctx: { db } }) => {
    console.info(`casting vote for game`, { gameId, rawVote });

    await db.game.update({
      where: {
        id: gameId,
      },
      data: {
        likes: {
          increment: rawVote === 'up' ? 1 : 0,
        },
        dislikes: {
          increment: rawVote === 'down' ? 1 : 0,
        },
      },
    });

    return { success: true };
  });
