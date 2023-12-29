import { Box } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { GameLoadingCover } from './game-loading-cover';
import { GameBanner } from './game-banner';
import { useRouter } from 'next/router';
import { GameFrame } from './game-frame';
import { GameExitFullscreenButton } from './game-exit-fullscreen-button';
import {
  DeveloperSchema,
  GameAnalyticsSchema,
  SerializableGameSchema,
  UserVoteSchema,
} from '@worksheets/util/types';
import { isMobileOrTabletDeviceBrowser } from '@worksheets/util-devices';
import { useFullscreen } from './useFullscreen';
import { useDeviceOrientation } from '@worksheets/ui-core';

export type GameLauncherProps = {
  game: SerializableGameSchema;
  analytics: GameAnalyticsSchema;
  developer: DeveloperSchema;
  userVote?: UserVoteSchema['vote'];
  onPlay: () => void;
  onVote: (vote: UserVoteSchema['vote']) => void;
  onViewGamePlay: () => void;
};

export const GameLauncher: FC<GameLauncherProps> = ({
  developer,
  analytics,
  game,
  userVote,
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

    if (game.file.type === 'redirect') {
      push(game.file.url);
    } else {
      if (isMobileOrTablet) {
        requestFullScreen();
      }
      setShowLoadingCover(false);
    }
  };

  const handleFullscreen: () => void = () => {
    if (game.file.type === 'redirect') {
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
          backgroundUrl={game.bannerUrl}
          iconUrl={game.iconUrl}
          name={game.name}
          onPlay={handlePlayGame}
          platforms={game.platforms}
          orientations={game.orientations}
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
          upVotes={analytics.votes.up}
          downVotes={analytics.votes.down}
          plays={analytics.plays}
          userVote={userVote}
          onFullscreen={handleFullscreen}
          onVote={onVote}
          onViewGamePlay={onViewGamePlay}
        />
      )}
    </Box>
  );
};
