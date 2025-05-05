import { basicGameInfoSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../../procedures';

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(basicGameInfoSchema.array())
  .query(async ({ ctx: { db }, input }) => {
    const game = await db.game.findMany({
      where: {
        team: {
          id: input.id,
        },
        visibility: 'PUBLIC',
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        plays: true,
        cover: true,
      },
      orderBy: {
        plays: 'desc',
      },
    });
    return game.map((game) => ({
      ...game,
      teamId: input.id,
    }));
  });
