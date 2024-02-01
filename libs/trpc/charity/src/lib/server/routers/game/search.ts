import { SearchResultsData } from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(z.object({ query: z.string() }))
  .output(z.custom<Omit<SearchResultsData, 'recent'>>())
  .query(({ input: { query } }) => {
    const foundGames = games.filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );

    const foundCategories = tagSchemas.filter((tag) =>
      tag.name.toLowerCase().includes(query.toLowerCase())
    );

    return {
      games: foundGames.map((game) => ({
        id: game.id,
        name: game.name,
        image: game.iconUrl,
      })),
      categories: foundCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        image: cat.iconUrl,
      })),
    };
  });
