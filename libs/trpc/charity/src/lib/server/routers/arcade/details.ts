import { recommendations } from '@worksheets/util/settings';
import {
  BasicCategoryInfo,
  BasicPrizeDetails,
  DetailedGameInfo,
  PromotedGame,
} from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .output(
    z.object({
      categories: z.custom<BasicCategoryInfo[]>(),
      featured: z.object({
        primary: z.custom<PromotedGame[]>(),
        secondary: z.custom<PromotedGame>(),
      }),
      topRaffles: z.custom<BasicPrizeDetails[]>(),
      topGames: z.custom<DetailedGameInfo[]>(),
      allGames: z.custom<DetailedGameInfo[]>(),
    })
  )
  .query(async ({ ctx: { db } }) => {
    const tags = await db.gameCategory.findMany({
      select: {
        id: true,
        name: true,
        iconUrl: true,
      },
    });

    const categories: BasicCategoryInfo[] = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      image: tag.iconUrl,
    }));

    const games = await db.game.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        cover: true,
        plays: true,
      },
    });

    const topGames = recommendations.popular.map((id) => {
      const game = games.find((g) => g.id === id);

      if (!game) {
        throw new Error(`Game with id ${id} not found`);
      }

      return {
        id: game.id,
        name: game.title,
        image: game.thumbnail,
        plays: game.plays,
      };
    });

    const allGames = games.map((g) => ({
      id: g.id,
      name: g.title,
      image: g.thumbnail,
      plays: g.plays,
    }));

    const featured = recommendations.featured.map((id) => {
      const game = games.find((g) => g.id === id);

      if (!game) {
        throw new Error(`Game with id ${id} not found`);
      }

      return {
        href: `/play/${id}`,
        image: game.cover,
        name: game.title,
      };
    });

    const primary = featured.slice(0, -1);

    const secondary = featured[featured.length - 1];

    return {
      categories,
      featured: { primary, secondary },
      topRaffles: [], // TODO: add raffles
      topGames,
      allGames,
    };
  });
