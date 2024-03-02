import { BasicCategoryInfo } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      showEmpty: z.boolean().optional(),
    })
  )
  .output(z.custom<BasicCategoryInfo[]>())
  .query(async ({ input: { showEmpty }, ctx: { db } }) => {
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

    tags.sort((a, b) => b.games.length - a.games.length);

    const filtered = showEmpty
      ? tags
      : tags.filter((tag) => tag.games.length > 0);

    return filtered.map((tag) => ({
      id: tag.id,
      name: tag.name,
      image: tag.iconUrl,
    }));
  });
