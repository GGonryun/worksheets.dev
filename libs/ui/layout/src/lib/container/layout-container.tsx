import { trpc } from '@worksheets/trpc-charity';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { useSession } from 'next-auth/react';
import { FC, ReactNode, useState } from 'react';

import { Layout } from '../components';

const LayoutContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const { recentlyPlayed } = useRecentlyPlayedGames();

  const [query, setQuery] = useState('');

  const recommendations = trpc.game.recommendations.useQuery({
    recentlyPlayed: recentlyPlayed.map((g) => g.gameId),
  });

  const search = trpc.game.search.useQuery({ query }, { enabled: !!query });

  return (
    <Layout
      connected={Boolean(session?.user.id)}
      recommendations={recommendations.data}
      searchResults={search.data ?? undefined}
      searchQuery={query}
      onSearch={setQuery}
    >
      {children}
    </Layout>
  );
};

export default LayoutContainer;
