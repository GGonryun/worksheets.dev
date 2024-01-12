import { round, shorthandNumber } from '@worksheets/util/numbers';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(
    z.object({
      success: z.boolean(),
      plays: z.string(),
      score: z.string(),
      votes: z.object({
        up: z.string(),
        down: z.string(),
      }),
    })
  )
  .query(async ({ input: { gameId }, ctx: { db } }) => {
    const success = true;

    const gamePlays = await db.gamePlay.findMany({
      where: { gameId },
      select: { total: true },
    });

    // get all votes for this game
    const allVotes = await db.gameVote.findMany({
      where: { gameId },
    });

    // separate votes into up and down
    const votes = allVotes.reduce(
      (acc, curr) => {
        if (curr.vote > 0) {
          acc.up += 1;
        } else {
          acc.down += 1;
        }
        return acc;
      },
      { up: 0, down: 0 }
    );

    const plays = gamePlays.reduce((acc, curr) => acc + curr.total, 0);

    return {
      success,
      plays: shorthandNumber(plays),
      score: round(calculateScore(votes.up, votes.down), 1),
      votes: {
        up: shorthandNumber(votes?.up ?? 0),
        down: shorthandNumber(votes?.down ?? 0),
      },
    };
  });

function calculateScore(upVotes = 0, downVotes = 0) {
  if (upVotes === 0 && downVotes === 0) return 0;
  if (upVotes > 0 && downVotes === 0) return 5;
  if (upVotes === 0 && downVotes > 0) return 0;

  // the score is a number between 0 and 5 that represents the ratio of up votes to total votes
  return (upVotes / (upVotes + downVotes)) * 5;
}
