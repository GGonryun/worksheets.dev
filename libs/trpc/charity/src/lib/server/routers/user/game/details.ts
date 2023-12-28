import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(
    z.union([
      z.object({
        vote: z.union([z.literal('up'), z.literal('down')]).nullable(),
        favorite: z.boolean(),
        success: z.literal(true),
      }),
      z.object({
        vote: z.null(),
        favorite: z.literal(false),
        success: z.literal(false),
      }),
    ])
  )
  .query(async ({ input: { gameId }, ctx: { user, db } }) => {
    const userId = user.id;

    try {
      const userVote = await db.gameVote.findFirst({
        where: {
          gameId: gameId,
          userId: userId,
        },
      });

      const userFavorite = await db.gameFavorite.findFirst({
        where: {
          gameId: gameId,
          userId: userId,
        },
      });

      return {
        success: true,
        favorite: Boolean(userFavorite),
        vote: calculateVote(userVote?.liked),
      };
    } catch (error) {
      console.error(
        `An unexpected error occurred while getting user game details: ${error}`
      );
    }

    return { success: false, favorite: false, vote: null };
  });

function calculateVote(userVote: boolean | undefined): 'up' | 'down' | null {
  if (userVote === undefined) {
    return null;
  }

  return userVote ? 'up' : 'down';
}
