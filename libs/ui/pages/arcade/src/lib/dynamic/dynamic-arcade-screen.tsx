import { trpc } from '@worksheets/trpc-charity';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { ArcadeScreen } from '../components/arcade-screen';

const ArcadeScreenContainer: React.FC = () => {
  const { recentlyPlayed } = useRecentlyPlayedGames();

  const { data, isLoading, error } = trpc.arcade.details.useQuery(undefined, {
    enabled: true,
  });

  if (isLoading) return <LoadingScreen />;

  if (error) return <ErrorScreen />;

  return (
    <ArcadeScreen
      categories={data.categories}
      featured={data.featured}
      topRaffles={data.topRaffles}
      topGames={data.topGames}
      allGames={data.allGames}
      recentGames={recentlyPlayed}
    />
  );
};

export const DynamicArcadeScreen = dynamic(
  () => Promise.resolve(ArcadeScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
