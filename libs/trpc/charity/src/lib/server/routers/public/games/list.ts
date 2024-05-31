import { GameStatus, Prisma } from '@worksheets/prisma';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      status: z.nativeEnum(GameStatus).optional(),
    })
  )
  .output(z.custom<Prisma.GameGetPayload<true>>().array())
  .query(async ({ input: { status }, ctx: { db } }) => {
    return await db.game.findMany({
      where: {
        status,
      },
    });
  });
