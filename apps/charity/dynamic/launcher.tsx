import { GameLauncher } from '@worksheets/ui/pages/game';
import {
  DeveloperSchema,
  GameAnalyticsSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { FC } from 'react';
import { useRecentlyPlayedGames } from '../hooks/useRecentlyPlayedGames';

const DynamicGameLauncher: FC<{
  game: SerializableGameSchema;
  analytics: GameAnalyticsSchema;
  developer: DeveloperSchema;
}> = ({ game, developer, analytics }) => {
  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const handleFavorite = () => {
    alert('TODO: handle favorite');
  };

  const handleVote = (vote: 'up' | 'down') => {
    alert('TODO: handle user vote');
  };

  const handlePlayGame = () => {
    addRecentlyPlayed({
      gameId: game.id,
      playedLast: new Date().getTime(),
    });
    alert('TODO: record game play in the database');
  };

  const handleViewGameplay = () => {
    alert('TODO: handle view game play');
  };

  return (
    <GameLauncher
      analytics={analytics}
      game={game}
      developer={developer}
      onFavorite={handleFavorite}
      onPlay={handlePlayGame}
      onVote={handleVote}
      onViewGamePlay={handleViewGameplay}
      isFavorite={false}
      userVote={null}
    />
  );
};

export default DynamicGameLauncher;
