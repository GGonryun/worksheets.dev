import { GameLauncher } from '@worksheets/ui/pages/game';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { FC } from 'react';
import { useRecentlyPlayedGames } from '../hooks/useRecentlyPlayedGames';

const DynamicGameLauncher: FC<{
  game: SerializableGameSchema;
  developer: DeveloperSchema;
}> = ({ game, developer }) => {
  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const handleReportBug = () => {
    // TODO: improve bug handling
    alert('Our development team has been notified. Thank you!');
  };

  const handlePlayGame = () => {
    addRecentlyPlayed({
      gameId: game.id,
      playedLast: new Date().getTime(),
    });
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
      onReportBug={handleReportBug}
      onPlay={handlePlayGame}
    />
  );
};

export default DynamicGameLauncher;
