import { RecentGamesSection } from '@worksheets/ui/layout';
import { FC } from 'react';

import { useRecentlyPlayedGames } from '../hooks/useRecentlyPlayedGames';

const DynamicGameSection: FC = () => {
  const { recentlyPlayed } = useRecentlyPlayedGames();

  return <RecentGamesSection recent={recentlyPlayed} />;
};

export default DynamicGameSection;
