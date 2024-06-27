import { gameAchievementSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  list: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .output(gameAchievementSchema.array())
    .query(async ({ ctx: { db }, input }) => {
      const achievements = await db.gameAchievement.findMany({
        where: {
          gameId: input.gameId,
        },
        include: {
          loot: {
            include: {
              item: true,
            },
          },
          _count: {
            select: {
              players: true,
            },
          },
        },
        orderBy: {
          players: {
            _count: 'desc',
          },
        },
      });

      return achievements.map((a) => ({
        ...a,
        players: a._count.players,
      }));
    }),
});
