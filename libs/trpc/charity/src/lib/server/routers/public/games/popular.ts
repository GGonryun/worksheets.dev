import { Prisma } from '@worksheets/prisma';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { GameBasicInfoProperties, gameBasicInfoProperties } from './shared';

type PopularGames = Prisma.GameGetPayload<{
  select: GameBasicInfoProperties;
}>;

export default publicProcedure
  .output(z.custom<PopularGames[]>())
  .query(async ({ ctx: { db } }) => {
    return await db.game.findMany({
      orderBy: {
        plays: 'desc',
      },
      take: 10,
      select: gameBasicInfoProperties,
    });
  });
