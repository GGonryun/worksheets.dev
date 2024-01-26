import {
  developers,
  games,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FC, ReactNode } from 'react';

import { Layout } from '../components';
import { recommendations } from '../data';
import { Recommendations } from '../types';

const LayoutContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const { recentlyPlayed } = useRecentlyPlayedGames();

  return (
    <Layout
      connected={Boolean(session?.user.id)}
      recommendations={recommendationsFromSchema}
      onSearch={performSearch}
    >
      {children}
    </Layout>
  );
};

// eventually this will migrate to a real data source
const recommendationsFromSchema: Recommendations = {
  recent: [],
  popular: recommendations.popular.map((id) => {
    const game = games.find((game) => game.id === id);
    if (!game) throw new Error(`Game with id ${id} not found`);

    return {
      id: game.id,
      name: game.name,
      href: `/play/${game.id}`,
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
      href: `/play/${game.id}`,
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

const performSearch = async (q: string) => {
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
      href: `/play/${game.id}`,
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

export default LayoutContainer;
