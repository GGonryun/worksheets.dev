import { z } from 'zod';

import { maybeProcedure, publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  random: publicProcedure
    .input(
      z.object({
        isMobileOrTablet: z.boolean(),
        recentlyPlayed: z.string().array(),
      })
    )
    .output(
      z.object({
        id: z.string(),
      })
    )
    .query(
      async ({ input: { isMobileOrTablet, recentlyPlayed }, ctx: { db } }) => {
        // get a random game
        const game = await db.game.findMany({
          select: {
            id: true,
          },
          where: {
            status: 'PUBLISHED',
            viewport: {
              devices: {
                has: isMobileOrTablet ? 'MOBILE' : 'COMPUTER',
              },
            },
            id: {
              notIn: recentlyPlayed,
            },
          },
        });

        // get a random game
        const randomGame = game[Math.floor(Math.random() * game.length)];

        return {
          id: randomGame.id,
        };
      }
    ),
  record: maybeProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .mutation(async ({ input: { gameId }, ctx: { db, user } }) => {
      db.$transaction([
        db.gamePlayHistory.create({
          data: {
            gameId,
            userId: user?.id ?? undefined,
          },
        }),
        db.game.update({
          where: {
            id: gameId,
          },
          data: {
            plays: {
              increment: 1,
            },
          },
        }),
      ]);
    }),
});
