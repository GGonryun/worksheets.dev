import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { BasicCategoryInfo, BasicGameInfo } from '@worksheets/util/types';
import dynamic from 'next/dynamic';

import { ArcadeScreen } from '../components/arcade-screen';
import { DynamicTopRaffles } from './dynamic-top-raffles';

const ArcadeScreenContainer: React.FC<{
  categories: BasicCategoryInfo[];
  topGames: BasicGameInfo[];
  allGames: BasicGameInfo[];
  newGames: BasicGameInfo[];
  featured: {
    primary: BasicGameInfo[];
    secondary: BasicGameInfo;
  };
}> = ({ topGames, allGames, newGames, featured, categories }) => {
  const { recentlyPlayed } = useRecentlyPlayedGames();

  return (
    <ArcadeScreen
      categories={categories}
      featured={featured}
      topGames={topGames}
      allGames={allGames}
      newGames={newGames}
      topRaffles={<DynamicTopRaffles />}
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
