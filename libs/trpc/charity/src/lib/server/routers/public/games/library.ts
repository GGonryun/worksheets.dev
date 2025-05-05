import { Prisma } from '@worksheets/prisma';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { GameBasicInfoProperties, gameBasicInfoProperties } from './shared';

type Game = Prisma.GameGetPayload<{
  select: GameBasicInfoProperties;
}>;

export default publicProcedure
  .output(z.custom<Game[]>())
  .query(async ({ ctx: { db } }) => {
    return await db.game.findMany({
      select: gameBasicInfoProperties,
    });
  });
