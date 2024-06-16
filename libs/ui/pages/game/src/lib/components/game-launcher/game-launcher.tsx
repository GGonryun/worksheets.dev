import { Box } from '@mui/material';
import {
  DeveloperSchema,
  SerializableGameSchema,
  Vote,
} from '@worksheets/util/types';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';

import { useDeviceInformation } from '../../hooks/use-device-information';
import { GameBanner } from './game-banner';
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
  const boxRef = useRef<HTMLDivElement>(null);
  const { isMobileOrTablet } = useDeviceInformation(game.viewport);

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
  const showTopControls = fullscreen && isMobileOrTablet;

  const Banner = (
    <GameBanner
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
          backgroundUrl={game.bannerUrl}
          iconUrl={game.iconUrl}
          name={game.name}
          onPlay={handlePlayGame}
          viewport={game.viewport}
        />
      ) : (
        <GameFrame gameId={game.id} url={game.file.url} />
      )}

      {!showTopControls && Banner}
    </Box>
  );
};
