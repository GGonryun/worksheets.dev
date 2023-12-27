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
import { useDeviceOrientation } from '@worksheets/ui-core';

export type GameLauncherProps = {
  backgroundUrl: string;
  iconUrl: string;
  file: GameSchema['file'];
  name: string;
  developer: string;
  platforms: GameSchema['platforms'];
  orientations: GameSchema['orientations'];
  plays: string;
  upVotes: string;
  downVotes: string;
  isFavorite: boolean;
  userVote: 'up' | 'down' | null;
  onFavorite: () => void;
  onPlay: () => void;
  onVote: (vote: 'up' | 'down') => void;
  onViewGamePlay: () => void;
};

export const GameLauncher: FC<GameLauncherProps> = ({
  backgroundUrl,
  iconUrl,
  name,
  developer,
  file,
  platforms,
  orientations,
  plays,
  upVotes,
  downVotes,
  isFavorite,
  userVote,
  onFavorite,
  onPlay,
  onVote,
  onViewGamePlay,
}) => {
  const { push } = useRouter();
  const [showLoadingCover, setShowLoadingCover] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const isMobileOrTablet = isMobileOrTabletDeviceBrowser();
  const orientation = useDeviceOrientation();

  const { fullscreen, requestFullScreen, exitFullScreen } =
    useFullscreen(boxRef);

  useEffect(() => {
    if (isMobileOrTablet && !fullscreen) {
      setShowLoadingCover(true);
    }
  }, [fullscreen, isMobileOrTablet]);

  const handlePlayGame = () => {
    onPlay();

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
          onPlay={handlePlayGame}
          platforms={platforms}
          orientations={orientations}
          deviceOrientation={orientation}
          isMobileOrTablet={isMobileOrTablet}
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
          upVotes={upVotes}
          downVotes={downVotes}
          plays={plays}
          isFavorite={isFavorite}
          userVote={userVote}
          onFavorite={onFavorite}
          isFullscreen={!!fullscreen}
          onFullscreen={handleFullscreen}
          onVote={onVote}
          onViewGamePlay={onViewGamePlay}
        />
      )}
    </Box>
  );
};
