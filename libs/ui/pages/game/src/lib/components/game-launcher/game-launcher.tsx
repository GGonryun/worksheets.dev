import { Box } from '@mui/material';
import { useDeviceOrientation } from '@worksheets/ui-core';
import {
  DeveloperSchema,
  SerializableGameSchema,
  Vote,
} from '@worksheets/util/types';
import { isMobileOrTabletDeviceBrowser } from '@worksheets/util-devices';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';

import { GameBanner } from './game-banner';
import { GameExitFullscreenButton } from './game-exit-fullscreen-button';
import { GameFrame } from './game-frame';
import { GameLoadingCover } from './game-loading-cover';
import { useFullscreen } from './useFullscreen';

export type GameLauncherProps = {
  game: SerializableGameSchema;
  developer: DeveloperSchema;
  userVote?: Vote;
  onPlay: () => void;
  onVote: (vote: Vote) => void;
};

export const GameLauncher: FC<GameLauncherProps> = ({
  developer,
  game,
  userVote,
  onPlay,
  onVote,
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

    if (game.file.type === 'EXTERNAL') {
      push(game.file.url);
    } else {
      if (isMobileOrTablet) {
        requestFullScreen();
      }
      setShowLoadingCover(false);
    }
  };

  const handleFullscreen: () => void = () => {
    if (game.file.type === 'EXTERNAL') {
      throw new Error("Unsupported action: game.file.type === 'EXTERNAL'");
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
      className="game-launcher"
      ref={boxRef}
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
      }}
    >
      {showLoadingCover ? (
        <GameLoadingCover
          backgroundUrl={game.bannerUrl}
          iconUrl={game.iconUrl}
          name={game.name}
          onPlay={handlePlayGame}
          devices={game.viewport.devices}
          orientations={game.viewport.orientations}
          deviceOrientation={orientation}
          isMobileOrTablet={isMobileOrTablet}
        />
      ) : (
        <GameFrame url={game.file.url} ref={frameRef} />
      )}
      {fullscreen && isMobileOrTablet ? (
        <GameExitFullscreenButton onBack={handleFullscreen} />
      ) : (
        <GameBanner
          isFullscreen={!!fullscreen}
          developer={developer.name}
          type={game.file.type}
          iconUrl={game.iconUrl}
          name={game.name}
          likes={game.likes}
          dislikes={game.dislikes}
          plays={game.plays}
          userVote={userVote}
          onFullscreen={handleFullscreen}
          onVote={onVote}
        />
      )}
    </Box>
  );
};
