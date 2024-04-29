import { trpc } from '@worksheets/trpc-charity';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { ArcadeScreen } from '../components/arcade-screen';

const ArcadeScreenContainer: React.FC = () => {
  const { recentlyPlayed } = useRecentlyPlayedGames();

  const arcade = trpc.public.arcade.details.useQuery(undefined);

  const categories = trpc.public.categories.list.useQuery({ showEmpty: false });

  if (arcade.isLoading || categories.isLoading) return <LoadingScreen />;

  if (arcade.error || categories.error) return <ErrorScreen />;

  return (
    <ArcadeScreen
      categories={categories.data}
      featured={arcade.data.featured}
      topRaffles={arcade.data.topRaffles}
      topGames={arcade.data.topGames}
      topBattles={arcade.data.topBattles}
      allGames={arcade.data.allGames}
      newGames={arcade.data.newGames}
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
