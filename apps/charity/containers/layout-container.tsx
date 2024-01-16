import {
  developers,
  games,
  recommendations,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import { Layout } from '@worksheets/ui/layout';
import { Recommendations } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FC, ReactNode } from 'react';

import { getRandomGame } from '../util/randomizer';

const DynamicGameSection = dynamic(() => import('../dynamic/recent-games'), {
  ssr: false,
});

const LayoutContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const { push } = useRouter();
  const { data: session } = useSession();

  return (
    <Layout
      connected={Boolean(session?.user.id)}
      recentGamesSection={<DynamicGameSection />}
      recommendations={recommendationsFromSchema}
      onSearch={performSearch}
      onRandomGame={() => {
        const randomGame = getRandomGame(true);
        push(`/play/${randomGame.id}`);
      }}
    >
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
