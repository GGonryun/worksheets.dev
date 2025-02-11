'use client';

import { Box } from '@mui/material';
import { useDetectAdBlock } from '@worksheets/ui/components/advertisements';
import {
  DeveloperSchema,
  SerializableGameSchema,
  Vote,
} from '@worksheets/util/types';
import { useRouter } from 'next/navigation';
import { SessionContextValue } from 'next-auth/react';
import { FC, useEffect, useRef, useState } from 'react';

import { useDeviceInformation } from '../../hooks/use-device-information';
import { useFullscreen } from '../../hooks/use-fullscreen';
import { GameBanner } from './game-banner';
import { GameFrame } from './game-frame';
import { GameLoadingCover } from './game-loading-cover';

export type GameLauncherProps = {
  game: SerializableGameSchema;
  developer: DeveloperSchema;
  userVote?: Vote;
  status: SessionContextValue['status'];
  onPlay: () => void;
  onVote: (vote: Vote) => void;
};

export const GameLauncher: FC<GameLauncherProps> = ({
  developer,
  game,
  userVote,
  status,
  onPlay,
  onVote,
}) => {
  // TODO: set this on a per-game basis
  const requiresAds = false;
  const { push } = useRouter();
  const [showLoadingCover, setShowLoadingCover] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const { isMobileOrTablet } = useDeviceInformation(game.viewport);
  const adBlockDetected = useDetectAdBlock();

  const { fullscreen, requestFullScreen, exitFullScreen } =
    useFullscreen(boxRef);

  // shows the loading cover on mobile screens when the user exits fullscreen
  useEffect(() => {
    if (isMobileOrTablet && !fullscreen) {
      setShowLoadingCover(true);
    }
  }, [fullscreen, isMobileOrTablet]);

  const handlePlayGame = () => {
    if (requiresAds && adBlockDetected) return;
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
        exitFullScreen();
      } else {
        requestFullScreen();
      }
    }
  };
  const showTopControls = fullscreen && isMobileOrTablet;

  const Banner = (
    <GameBanner
      boxRef={boxRef}
      isMobileOrTablet={isMobileOrTablet}
      isFullscreen={fullscreen}
      developer={developer}
      game={game}
      userVote={userVote}
      onFullscreen={handleFullscreen}
      onVote={onVote}
    />
  );

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
      {showTopControls && Banner}

      {showLoadingCover ? (
        <GameLoadingCover
          gameId={game.id}
          backgroundUrl={game.bannerUrl}
          iconUrl={game.iconUrl}
          name={game.name}
          onPlay={handlePlayGame}
          viewport={game.viewport}
          status={status}
          isFullscreen={fullscreen}
          requiresAds={requiresAds}
          supportsCloudStorage={game.cloudStorage}
        />
      ) : (
        <GameFrame gameId={game.id} url={game.file.url} status={status} />
      )}

      {!showTopControls && Banner}
    </Box>
  );
};
