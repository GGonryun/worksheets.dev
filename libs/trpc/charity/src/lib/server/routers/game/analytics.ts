import { z } from '@worksheets/zod';
import { publicProcedure } from '../../procedures';
import { round, shorthandNumber } from '@worksheets/util/numbers';
import { ANONYMOUS_USER_ID } from '@worksheets/util/misc';

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
      favorites: z.string(),
      votes: z.object({
        up: z.string(),
        down: z.string(),
      }),
      topPlayers: z.array(
        z.object({ id: z.string(), username: z.string(), plays: z.string() })
      ),
    })
  )
  .query(async ({ input: { gameId }, ctx: { user, db } }) => {
    const success = true;

    const gamePlays = await db.gamePlay.findMany({
      where: { gameId },
      select: { total: true },
    });

    const upVotes = await db.gameVote.count({
      where: { gameId, liked: true },
    });

    const downVotes = await db.gameVote.count({
      where: { gameId, liked: false },
    });

    const favorites = await db.gameFavorite.count({
      where: { gameId },
    });

    const plays = gamePlays.reduce((acc, curr) => acc + curr.total, 0);

    const score = calculateScore(upVotes, downVotes);

    const rawTopPlayers = await db.gamePlay.findMany({
      where: { gameId },
      orderBy: { total: 'desc' },
      include: { user: { select: { username: true, id: true } } },
      take: 10,
    });

    const topPlayers = rawTopPlayers
      .filter((p) => p.userId || p.user)
      .map((p) => ({
        id: p.user?.id ?? ANONYMOUS_USER_ID,
        username: p.user?.username ?? p.user?.id ?? ANONYMOUS_USER_ID,
        plays: shorthandNumber(p.total),
      }));

    return {
      success,
      plays: shorthandNumber(plays),
      favorites: shorthandNumber(favorites),
      score: round(score, 1),
      votes: { up: shorthandNumber(upVotes), down: shorthandNumber(downVotes) },
      topPlayers: topPlayers,
    };
  });

function calculateScore(upVotes: number, downVotes: number) {
  if (upVotes === 0 && downVotes === 0) return 0;
  if (upVotes > 0 && downVotes === 0) return 5;
  if (upVotes === 0 && downVotes > 0) return 0;

  // the score is a number between 0 and 5 that represents the ratio of up votes to total votes
  return (upVotes / (upVotes + downVotes)) * 5;
}
