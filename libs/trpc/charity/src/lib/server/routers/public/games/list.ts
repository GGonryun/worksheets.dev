import { GameStatus } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      status: z.nativeEnum(GameStatus).optional(),
    })
  )
  .output(z.string().array())
  .query(async ({ input: { status }, ctx: { db } }) => {
    const games = await db.game.findMany({
      where: {
        status,
      },
      select: {
        id: true,
      },
    });

    return games.map((game) => game.id);
  });
