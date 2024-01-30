import {
  games,
  recommendations,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import { Recommendations, RecommendationsSchema } from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      recentlyPlayed: z.array(z.string()),
    })
  )
  .output(z.custom<Recommendations>())
  .query(({ input: { recentlyPlayed } }) => {
    return {
      popular: recommendations.popular.map(convertGame),
      new: recommendations.new.map(convertGame),
      categories: recommendations.categories.map(convertCategory),
      recent: recentlyPlayed.map(convertGame),
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

const convertCategory = (id: string) => {
  const tag = tagSchemas.find((tag) => tag.id === id);
  if (!tag) throw new Error(`Tag with id ${id} not found`);
  return {
    id: tag.id,
    name: tag.name,
    image: tag.iconUrl,
  };
};
