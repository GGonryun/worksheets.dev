import { Box } from '@mui/material';
import { FC } from 'react';
import { GameLoadingCover } from './game-loading-cover';
import { GameBanner } from './game-banner';

export type GameLauncherProps = {
  backgroundUrl: string;
  iconUrl: string;
  gameUrl: string;
  name: string;
  developer: string;
  onPlay: () => void;
  onReportBug: () => void;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
};

export const GameLauncher: FC<GameLauncherProps> = ({
  backgroundUrl,
  iconUrl,
  name,
  developer,
  onPlay,
  onReportBug,
  onEnterFullscreen,
  onExitFullscreen,
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
        iconUrl={iconUrl}
        developer={developer}
        name={name}
        onReportBug={onReportBug}
        onEnterFullscreen={onEnterFullscreen}
        onExitFullscreen={onExitFullscreen}
      />
    </Box>
  );
};
