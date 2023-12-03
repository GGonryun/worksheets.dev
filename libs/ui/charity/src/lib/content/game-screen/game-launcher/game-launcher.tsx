import { Box } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { GameLoadingCover } from './game-loading-cover';
import { GameBanner } from './game-banner';
import { useRouter } from 'next/router';
import { GameFrame } from './game-frame';
import { GameExitFullscreenButton } from './game-exit-fullscreen-button';
import { GameSchema } from '@worksheets/util/types';
import { isMobileOrTabletDeviceBrowser } from '@worksheets/util-devices';
import { useFullscreen } from './useFullscreen';

export type GameLauncherProps = {
  backgroundUrl: string;
  iconUrl: string;
  file: GameSchema['file'];
  name: string;
  developer: string;
  platforms: GameSchema['platforms'];
  onReportBug: () => void;
};

export const GameLauncher: FC<GameLauncherProps> = ({
  backgroundUrl,
  iconUrl,
  name,
  developer,
  file,
  platforms,
  onReportBug,
}) => {
  const { push } = useRouter();
  const [showLoadingCover, setShowLoadingCover] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const isMobileOrTablet = isMobileOrTabletDeviceBrowser();

  const { fullscreen, requestFullScreen, exitFullScreen } =
    useFullscreen(boxRef);

  useEffect(() => {
    if (isMobileOrTablet && !fullscreen) {
      setShowLoadingCover(true);
    }
  }, [fullscreen, isMobileOrTablet]);

  const handleRedirect = () => {
    if (file.type === 'redirect') {
      push(file.url);
    } else {
      throw new Error("Unsupported action: game.file.type !== 'redirect'");
    }
  };

  const onPlay = () => {
    if (file.type === 'redirect') {
      push(file.url);
    } else {
      if (isMobileOrTablet) {
        requestFullScreen();
      }
      setShowLoadingCover(false);
    }
  };

  const handleFullscreen = () => {
    if (file.type === 'redirect') {
      throw new Error("Unsupported action: game.file.type === 'redirect'");
    } else {
      if (fullscreen) {
        if (isMobileOrTablet) {
          setShowLoadingCover(true);
        }
        exitFullScreen();
      } else {
        if (isMobileOrTablet) {
          setShowLoadingCover(false);
        }
        requestFullScreen();
      }
    }
  };

  return (
    <Box
      ref={boxRef}
      height="100%"
      width="100%"
      className="game-launcher"
      display="flex"
      flexDirection="column"
      sx={{
        userSelect: 'none',
      }}
    >
      {showLoadingCover ? (
        <GameLoadingCover
          backgroundUrl={backgroundUrl}
          iconUrl={iconUrl}
          name={name}
          onPlay={onPlay}
          platforms={platforms}
        />
      ) : (
        <GameFrame url={file.url} ref={frameRef} />
      )}
      {fullscreen && isMobileOrTablet ? (
        <GameExitFullscreenButton onBack={handleFullscreen} />
      ) : (
        <GameBanner
          type={file.type}
          iconUrl={iconUrl}
          developer={developer}
          name={name}
          onReportBug={onReportBug}
          isFullscreen={!!fullscreen}
          onFullscreen={handleFullscreen}
          onRedirect={handleRedirect}
        />
      )}
    </Box>
  );
};
