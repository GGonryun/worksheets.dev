import { Box } from '@mui/material';
import { FC } from 'react';
import { GameLoadingCover } from './game-loading-cover';
import { GameBanner } from './game-banner';
import { GameSchema } from '../../../../types';

export type GameLauncherProps = {
  backgroundUrl: string;
  iconUrl: string;
  file: GameSchema['file'];
  name: string;
  developer: string;
  onPlay: () => void;
  onReportBug: () => void;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
  onRedirect: () => void;
};

export const GameLauncher: FC<GameLauncherProps> = ({
  backgroundUrl,
  iconUrl,
  name,
  developer,
  file,
  onPlay,
  onReportBug,
  onEnterFullscreen,
  onExitFullscreen,
  onRedirect,
}) => {
  return (
    <Box
      height="100%"
      width="100%"
      className="game-launcher"
      display="flex"
      flexDirection="column"
    >
      <GameLoadingCover
        backgroundUrl={backgroundUrl}
        iconUrl={iconUrl}
        name={name}
        onPlay={onPlay}
      />
      <GameBanner
        type={file.type}
        iconUrl={iconUrl}
        developer={developer}
        name={name}
        onReportBug={onReportBug}
        onEnterFullscreen={onEnterFullscreen}
        onExitFullscreen={onExitFullscreen}
        onRedirect={onRedirect}
      />
    </Box>
  );
};
