import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
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
  );
