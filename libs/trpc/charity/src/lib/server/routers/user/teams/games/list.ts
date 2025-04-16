import { Prisma } from '@worksheets/prisma';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

const teamOwnedGameSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  plays: z.number(),
  duration: z.number(),
  lastUpdated: z.string(),
});

type TeamOwnedGameSchema = z.infer<typeof teamOwnedGameSchema>;

export default protectedProcedure
  .input(
    z.object({
      teamId: z.string(),
    })
  )
  .output(z.array(teamOwnedGameSchema))
  .query(async ({ ctx: { db }, input: { teamId } }) => {
    const games = await db.game.findMany({
      where: {
        teamId,
      },
    });

    return games.map(parseGame);
  });

const parseGame = (
  game: Prisma.GameGetPayload<{
    // no-op
  }>
): TeamOwnedGameSchema => ({
  id: game.id,
  title: game.title,
  status: game.status,
  plays: game.plays,
  duration: game.duration,
  lastUpdated: game.updatedAt.toISOString(),
});
