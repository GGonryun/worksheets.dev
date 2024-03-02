import { Prisma } from '@worksheets/prisma';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

const properties = {
  id: true as const,
  title: true as const,
  thumbnail: true as const,
  cover: true as const,
  plays: true as const,
};

type Game = Prisma.GameGetPayload<{
  select: typeof properties;
}>;

export default publicProcedure
  .output(z.custom<Game[]>())
  .query(async ({ ctx: { db } }) => {
    return await db.game.findMany({
      select: properties,
    });
  });
