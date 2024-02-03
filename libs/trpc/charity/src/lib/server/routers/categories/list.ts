import { BasicCategoryInfo } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .output(z.custom<BasicCategoryInfo[]>())
  .query(async ({ ctx: { db } }) => {
    const tags = await db.gameCategory.findMany({
      select: {
        id: true,
        name: true,
        iconUrl: true,
        games: {
          select: {
            gameId: true,
          },
        },
      },
    });

    return tags
      .filter((tag) => tag.games.length > 0)
      .map((tag) => ({
        id: tag.id,
        name: tag.name,
        image: tag.iconUrl,
      }));
  });
