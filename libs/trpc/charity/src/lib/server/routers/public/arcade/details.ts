import { routes } from '@worksheets/ui/routes';
import { FEATURED_GAMES } from '@worksheets/util/settings';
import {
  BasicCategoryInfo,
  BasicGameInfo,
  BasicRaffleDetails,
  PromotedGame,
} from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .output(
    z.object({
      categories: z.custom<BasicCategoryInfo[]>(),
      featured: z.object({
        primary: z.custom<PromotedGame[]>(),
        secondary: z.custom<PromotedGame>(),
      }),
      topRaffles: z.custom<BasicRaffleDetails[]>(),
      topGames: z.custom<BasicGameInfo[]>(),
      allGames: z.custom<BasicGameInfo[]>(),
      newGames: z.custom<BasicGameInfo[]>(),
    })
  )
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

    const categories: BasicCategoryInfo[] = tags
      .filter((tag) => tag.games.length > 0)
      .sort((a, b) => b.games.length - a.games.length)
      .map((tag) => ({
        id: tag.id,
        name: tag.name,
        image: tag.iconUrl,
      }));

    const games = await db.game.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        cover: true,
        plays: true,
        createdAt: true,
      },
    });

    const topGames = [...games]
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 10)
      .map((g) => ({
        id: g.id,
        name: g.title,
        imageUrl: g.thumbnail,
        plays: g.plays,
      }));

    const newGames = [...games]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
      .map((g) => ({
        id: g.id,
        name: g.title,
        imageUrl: g.thumbnail,
        plays: g.plays,
      }));

    const allGames = [...games].map((g) => ({
      id: g.id,
      name: g.title,
      imageUrl: g.thumbnail,
      plays: g.plays,
    }));

    const featured = FEATURED_GAMES.map((id) => {
      const game = games.find((g) => g.id === id);

      if (!game) {
        throw new Error(`Game with id ${id} not found`);
      }

      return {
        href: routes.game.path({ params: { gameId: game.id } }),
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
      newGames,
      topGames,
      allGames,
    };
  });
