import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC, useRef, useState } from 'react';
import { GameLoadingCover } from './game-loading-cover';
import { GameBanner } from './game-banner';
import { GameSchema } from '../../../../types';
import { useRouter } from 'next/router';
import { GameFrame } from './game-frame';
import { useEventListener } from '@worksheets/ui-core';
import { GameExitFullscreenButton } from './game-exit-fullscreen-button';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('mobile2'));

  const [showLoadingCover, setShowLoadingCover] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<Document>(document);
  const [fullscreen, setFullscreen] = useState(false);
  const { push } = useRouter();

  const handleRedirect = () => {
    if (file.type === 'redirect') {
      push(file.url);
    } else {
      alert("Unsupported action: game.file.type !== 'redirect'");
    }
  };

  const onPlay = () => {
    if (file.type === 'redirect') {
      push(file.url);
    } else {
      if (isMobile) {
        requestFullScreen(boxRef.current);
      }
      setShowLoadingCover(false);
    }
  };

  const handleFullscreen = () => {
    if (file.type === 'redirect') {
      alert("Unsupported action: game.file.type === 'redirect'");
    } else {
      if (fullscreen) {
        if (isMobile) {
          setShowLoadingCover(true);
        }
        documentRef.current
          .exitFullscreen()
          .then(() => console.log('Document Exited from Full screen mode'))
          .catch((err) => console.error(err));
      } else {
        requestFullScreen(boxRef.current);
      }
    }
  };

  const handleFullscreenChange = (e: Event) => {
    const isFullscreen = documentRef.current.fullscreenElement !== null;
    if (isMobile && !isFullscreen) {
      setShowLoadingCover(true);
    }
    setFullscreen(isFullscreen);
  };

  useEventListener('fullscreenchange', handleFullscreenChange, documentRef);
  useEventListener(
    'webkitfullscreenchange',
    handleFullscreenChange,
    documentRef
  );
  useEventListener('mozfullscreenchange', handleFullscreenChange, documentRef);
  useEventListener('msfullscreenchange', handleFullscreenChange, documentRef);

  return (
    <Box
      ref={boxRef}
      height="100%"
      width="100%"
      className="game-launcher"
      display="flex"
      flexDirection="column"
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
      {fullscreen && isMobile ? (
        <GameExitFullscreenButton onBack={handleFullscreen} />
      ) : (
        <GameBanner
          type={file.type}
          iconUrl={iconUrl}
          developer={developer}
          name={name}
          onReportBug={onReportBug}
          isFullscreen={documentRef.current.fullscreenElement !== null}
          onFullscreen={handleFullscreen}
          onRedirect={handleRedirect}
        />
      )}
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function requestFullScreen(element: any) {
  // Supports most browsers and their versions.
  const requestMethod =
    element.requestFullScreen ||
    element.requestFullscreen ||
    element.webkitRequestFullScreen ||
    element.webkitRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.mozRequestFullscreen ||
    element.msRequestFullScreen ||
    element.msRequestFullscreen;

  if (requestMethod) {
    // Native full screen.
    requestMethod.call(element);
  } else {
    throw new Error('Unsupported action: requestFullScreen');
  }
}
