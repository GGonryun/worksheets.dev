import { GameLauncher } from '@worksheets/ui/pages/game';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { FC } from 'react';

const DynamicGameLauncher: FC<{
  game: SerializableGameSchema;
  developer: DeveloperSchema;
}> = ({ game, developer }) => {
  const handleReportBug = () => {
    // TODO: improve bug handling
    alert('Our development team has been notified. Thank you!');
  };
  return (
    <GameLauncher
      backgroundUrl={game.bannerUrl}
      iconUrl={game.iconUrl}
      file={game.file}
      name={game.name}
      developer={developer.name}
      platforms={game.platforms}
      onReportBug={handleReportBug}
    />
  );
};

export default DynamicGameLauncher;
