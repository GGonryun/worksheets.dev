import { GameLauncher } from '@worksheets/ui/pages/game';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { FC } from 'react';
import { useRecentlyPlayedGames } from '../hooks/useRecentlyPlayedGames';
import { shorthandNumber } from '@worksheets/util/numbers';

const DynamicGameLauncher: FC<{
  game: SerializableGameSchema;
  developer: DeveloperSchema;
}> = ({ game, developer }) => {
  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const handleFavorite = () => {
    alert('TODO: handle favorite');
  };

  const handleVote = (vote: 'up' | 'down') => {
    alert(
      "Thanks for voting! We'll use this information to improve our games."
    );
  };

  const handlePlayGame = () => {
    addRecentlyPlayed({
      gameId: game.id,
      playedLast: new Date().getTime(),
    });
    alert('TODO: record game play in the database');
  };

  return (
    <GameLauncher
      backgroundUrl={game.bannerUrl}
      iconUrl={game.iconUrl}
      file={game.file}
      name={game.name}
      developer={developer.name}
      orientations={game.orientations}
      platforms={game.platforms}
      plays={shorthandNumber(game.plays)}
      upVotes={shorthandNumber(game.upVotes)}
      downVotes={shorthandNumber(game.downVotes)}
      onFavorite={handleFavorite}
      onPlay={handlePlayGame}
      onVote={handleVote}
      onViewGamePlay={() => alert('TODO: handle view game play')}
      isFavorite={false}
      userVote={null}
    />
  );
};

export default DynamicGameLauncher;
