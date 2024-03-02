import { Prisma } from '@worksheets/prisma';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

const select = {
  id: true as const,
  title: true as const,
  description: true as const,
  plays: true as const,
  cover: true as const,
  thumbnail: true as const,
};

type PopularGames = Prisma.GameGetPayload<{
  select: typeof select;
}>;

export default publicProcedure
  .output(z.custom<PopularGames[]>())
  .query(async ({ ctx: { db } }) => {
    return await db.game.findMany({
      orderBy: {
        plays: 'desc',
      },
      take: 10,
      select,
    });
  });
