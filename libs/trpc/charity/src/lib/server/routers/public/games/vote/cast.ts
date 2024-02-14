import { Vote, voteSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../../procedures';

const calculateDelta = (
  currentVote: Vote | undefined,
  newVote: Vote
): { likes: number; dislikes: number } => {
  if (!currentVote) {
    // if we don't have a vote, we're adding a new one.
    return newVote === 'up'
      ? { likes: 1, dislikes: 0 }
      : { likes: 0, dislikes: 1 };
  } else {
    // if we have a vote, we might need to remove it first.
    // if the vote is the same, we're removing it.
    if (currentVote === newVote) {
      return newVote === 'up'
        ? { likes: -1, dislikes: 0 }
        : { likes: 0, dislikes: -1 };
    } else {
      // if the vote is different, we're changing it.
      return newVote === 'up'
        ? { likes: 1, dislikes: -1 }
        : { likes: -1, dislikes: 1 };
    }
  }
};

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
      currentVote: voteSchema.optional(),
      newVote: voteSchema,
    })
  )
  .output(
    z.object({
      success: z.boolean(),
    })
  )
  .mutation(
    async ({ input: { gameId, currentVote, newVote }, ctx: { db } }) => {
      const delta = calculateDelta(currentVote, newVote);

      console.info(`casting vote for game`, {
        gameId,
        currentVote,
        newVote,
        delta,
      });

      await db.game.update({
        where: {
          id: gameId,
        },
        data: {
          likes: {
            increment: delta.likes,
          },
          dislikes: {
            increment: delta.dislikes,
          },
        },
      });

      return { success: true };
    }
  );
