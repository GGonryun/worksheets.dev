import {
  games,
  recommendations,
  tags,
} from '@worksheets/data-access/charity-games';
import {
  BasicCategoryInfo,
  BasicGameInfo,
  BasicPrizeDetails,
  PromotedGame,
} from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      recentGames: z.string().array(),
    })
  )
  .output(
    z.object({
      categories: z.custom<BasicCategoryInfo[]>(),
      featured: z.object({
        primary: z.custom<PromotedGame[]>(),
        secondary: z.custom<PromotedGame>(),
      }),
      topRaffles: z.custom<BasicPrizeDetails[]>(),
      topGames: z.custom<BasicGameInfo[]>(),
      allGames: z.custom<BasicGameInfo[]>(),
      recentGames: z.custom<BasicGameInfo[]>(),
    })
  )
  .query(({ input: { recentGames } }) => {
    const categories: BasicCategoryInfo[] = Object.entries(tags).map(
      ([, tag]) => ({
        id: tag.id,
        name: tag.name,
        image: tag.iconUrl,
      })
    );

    const topGames = recommendations.popular.map((id) => {
      const game = games.find((g) => g.id === id);

      if (!game) {
        throw new Error(`Game with id ${id} not found`);
      }

      return {
        id: game.id,
        name: game.name,
        image: game.iconUrl,
      };
    });

    const allGames = games.map((g) => ({
      id: g.id,
      name: g.name,
      image: g.iconUrl,
    }));

    const featured = recommendations.featured.map((id) => {
      const game = games.find((g) => g.id === id);

      if (!game) {
        throw new Error(`Game with id ${id} not found`);
      }

      return {
        href: `/play/${id}`,
        image: game.bannerUrl,
        name: game.name,
      };
    });
    const primary = featured.slice(0, -1);

    const secondary = featured[featured.length - 1];

    return {
      categories,
      featured: { primary, secondary },
      topRaffles: [], // TODO: add raffles
      recentGames: recentGames.map(convertGame),
      topGames,
      allGames,
    };
  });

const convertGame = (id: string) => {
  const game = games.find((game) => game.id === id);
  if (!game) throw new Error(`Game with id ${id} not found`);

  return {
    id: game.id,
    name: game.name,
    image: game.iconUrl,
  };
};
