import {
  developers,
  games,
  recommendations,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import { Layout } from '@worksheets/ui-charity';
import { Recommendations } from '@worksheets/util/types';
import { FC, ReactNode } from 'react';

export const LayoutContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Layout recommendations={recommendationsFromSchema} onSearch={performQuery}>
      {children}
    </Layout>
  );
};

// eventually this will migrate to a real data source

const recommendationsFromSchema: Recommendations = {
  popular: recommendations.popular.map((id) => {
    const game = games.find((game) => game.id === id);
    if (!game) throw new Error(`Game with id ${id} not found`);

    return {
      id: game.id,
      name: game.name,
      href: `/games/${game.id}`,
      imageUrl: game.iconUrl,
      banner: 'hot',
    };
  }),
  new: recommendations.new.map((id) => {
    const game = games.find((game) => game.id === id);
    if (!game) throw new Error(`Game with id ${id} not found`);
    return {
      id: game.id,
      name: game.name,
      href: `/games/${game.id}`,
      imageUrl: game.iconUrl,
      banner: 'new',
    };
  }),
  categories: recommendations.categories.map((id) => {
    const tag = tagSchemas.find((tag) => tag.id === id);
    if (!tag) throw new Error(`Tag with id ${id} not found`);
    return {
      id: tag.id,
      name: tag.name,
      imageUrl: tag.iconUrl,
    };
  }),
};

const performQuery = async (q: string) => {
  const found = games.filter((game) =>
    game.name.toLowerCase().includes(q.toLowerCase())
  );
  const categories = tagSchemas.filter((tag) =>
    tag.name.toLowerCase().includes(q.toLowerCase())
  );
  return {
    games: found.map((game) => ({
      id: game.id,
      name: game.name,
      href: `/games/${game.id}`,
      imageUrl: game.iconUrl,
      developer:
        developers.find((dev) => dev.id === game.developerId)?.name ??
        'Unknown',
    })),

    categories: categories.map((tag) => ({
      id: tag.id,
      name: tag.name,
      imageUrl: tag.iconUrl,
    })),
  };
};
