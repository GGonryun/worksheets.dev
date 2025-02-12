import {
  DesktopAccessDisabled,
  Error,
  InfoOutlined,
  KeyboardDoubleArrowDown,
  MobileOff,
  PlayCircleOutline,
  SvgIconComponent,
} from '@mui/icons-material';
import { alpha, Box, Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { useDetectAdBlock } from '@worksheets/ui/components/advertisements';
import { Column } from '@worksheets/ui/components/flex';
import { FillImage } from '@worksheets/ui/components/images';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { Emoji } from '@worksheets/ui-core';
import { GameSchema } from '@worksheets/util/types';
import { useRouter } from 'next/router';
import { SessionContextValue } from 'next-auth/react';
import React, { FC } from 'react';

import { useDeviceInformation } from '../../hooks/use-device-information';
import { PLAY_NOW_BUTTON_ID } from '../../hooks/use-fullscreen';
import { RotateToLandscape } from '../icons/rotate-to-landscape';
import { RotateToPortrait } from '../icons/rotate-to-portrait';

type GameLoadingCoverProps = {
  gameId: string;
  backgroundUrl: string;
  iconUrl: string;
  name: string;
  viewport: GameSchema['viewport'];
  onPlay: () => void;
  status: SessionContextValue['status'];
  isFullscreen: boolean;
  requiresAds: boolean;
  supportsCloudStorage: boolean;
};

export const GameLoadingCover: FC<GameLoadingCoverProps> = ({
  gameId,
  name,
  backgroundUrl,
  iconUrl,
  viewport,
  onPlay,
  isFullscreen,
  status,
  requiresAds,
  supportsCloudStorage,
}) => {
  const {
    showNoDesktopOverlay,
    showNoLandscapeOverlay,
    showNoMobileOverlay,
    showNoPortraitOverlay,
  } = useDeviceInformation(viewport);
  const adBlockDetected = useDetectAdBlock();

  return (
    <Box
      sx={{
        position: 'relative',
        // fill the parent container.
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: isFullscreen
          ? 0
          : (theme) => theme.shape.borderRadius * 2,
        // an inner shadow to make the cover pop.
        boxShadow: `inset 0 0 30px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.5)`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -32,
          left: -32,
          bottom: -32,
          right: -32,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // blur the background image
          filter: 'blur(10px) brightness(0.5)',
        }}
      >
        <FillImage priority alt={`${name} background`} src={backgroundUrl} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {adBlockDetected && requiresAds ? (
          <DoesNotSupportAdBlockOverlay />
        ) : showNoDesktopOverlay ? (
          <DoesNotSupportDesktopOverlay />
        ) : showNoMobileOverlay ? (
          <DoesNotSupportMobileOverlay />
        ) : showNoLandscapeOverlay ? (
          <DoesNotSupportLandscapeOverlay />
        ) : showNoPortraitOverlay ? (
          <DoesNotSupportPortraitOverlay />
        ) : (
          <>
            <PlayOverlay
              status={status}
              name={name}
              iconUrl={iconUrl}
              onPlay={onPlay}
            />
            {supportsCloudStorage && (
              <CloudStorageNotice gameId={gameId} status={status} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

const DoesNotSupportAdBlockOverlay: FC = () => (
  <DoesNotSupportOverlay
    PrimaryIcon={Error}
    primary="Ad blocker detected"
    secondary="Please disable your ad blocker to play this game."
  />
);

const DoesNotSupportDesktopOverlay: FC = () => (
  <DoesNotSupportOverlay
    PrimaryIcon={DesktopAccessDisabled}
    SecondaryIcon={KeyboardDoubleArrowDown}
    primary="Play something else?"
    secondary="This game does not support computer devices."
  />
);

const DoesNotSupportMobileOverlay: FC = () => (
  <DoesNotSupportOverlay
    PrimaryIcon={MobileOff}
    SecondaryIcon={KeyboardDoubleArrowDown}
    primary="Play something else?"
    secondary="This game does not support mobile devices."
  />
);

const DoesNotSupportLandscapeOverlay: FC = () => (
  <DoesNotSupportOverlay
    PrimaryIcon={RotateToPortrait}
    primary="Rotate your device"
  />
);

const DoesNotSupportPortraitOverlay: FC = () => (
  <DoesNotSupportOverlay
    PrimaryIcon={RotateToLandscape}
    primary="Rotate your device"
  />
);

const DoesNotSupportOverlay: FC<{
  PrimaryIcon: SvgIconComponent;
  SecondaryIcon?: SvgIconComponent;
  primary: string;
  secondary?: string;
}> = ({ PrimaryIcon, SecondaryIcon, primary, secondary }) => (
  <>
    <PrimaryIcon color="white" sx={{ fontSize: '3rem' }} />
    <Box mx={3}>
      <Typography
        sx={{
          fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
          color: (theme) => theme.palette.white.main,
          fontWeight: '700',
          fontSize: { xs: '1.25rem', sm: '1.5rem', lg: '1.75rem' },
          textAlign: 'center',
        }}
      >
        {primary}
      </Typography>
      {secondary && (
        <Typography
          sx={{
            fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
            color: (theme) => theme.palette.white.main,
            fontSize: { xs: '0.8rem', sm: '1rem', lg: '1.2rem' },
            textAlign: 'center',
          }}
        >
          {secondary}
        </Typography>
      )}
    </Box>
    {SecondaryIcon && <SecondaryIcon color="white" sx={{ fontSize: '2rem' }} />}
  </>
);

const CloudStorageNotice: React.FC<{
  gameId: string;
  status: SessionContextValue['status'];
}> = ({ gameId, status }) => {
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('mobile1'));
  const [show, setShow] = React.useState(false);
  const { push } = useRouter();
  const unauthenticated = status === 'unauthenticated';
  const loginPath = routes.login.path({
    query: {
      redirect: routes.game.path({
        params: { gameId },
      }),
    },
  });

  if (isTiny) return null;

  return (
    <>
      {unauthenticated ? (
        <LoginBanner
          onInfoClick={() => setShow(true)}
          onLoginClick={() => push(loginPath)}
        />
      ) : (
        <CloudStorageBanner onClick={() => setShow(true)} />
      )}

      <CloudStorageModal
        unauthenticated={unauthenticated}
        open={show}
        onClose={() => setShow(false)}
        onLoginClick={() => push(loginPath)}
      />
    </>
  );
};

const LoginBanner: React.FC<{
  onLoginClick: () => void;
  onInfoClick: () => void;
}> = ({ onInfoClick, onLoginClick }) => {
  return (
    <Box
      position="absolute"
      component="span"
      display="inline-flex"
      flexWrap="wrap"
      gap={1}
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      sx={{
        p: { xs: 0.5, sm: 1 },
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.7),
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Typography
        typography={{ xs: 'body3', sm: 'body2' }}
        component="span"
        color="white.main"
        fontWeight={{ xs: 500, sm: 500 }}
      >
        Save your progress
      </Typography>{' '}
      <Button
        variant="outlined"
        color="white"
        onClick={onLoginClick}
        size="small"
      >
        Log in now
      </Button>
      <InfoOutlined
        fontSize="small"
        color="white"
        onClick={onInfoClick}
        sx={{
          cursor: 'pointer',
        }}
      />
    </Box>
  );
};

const CloudStorageBanner: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Typography
      position="absolute"
      component="span"
      display="inline-flex"
      flexWrap="wrap"
      gap={0.5}
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      typography={{ xs: 'body3', sm: 'body2' }}
      sx={{
        left: 0,
        right: 0,
        bottom: { xs: 8, sm: 16 },
      }}
    >
      <Box component="span" color="white.main" fontWeight={500}>
        Progress will be saved
      </Box>{' '}
      <Link
        component="span"
        color="success.light"
        fontWeight={700}
        underline="hover"
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
        }}
      >
        on your account
        <InfoOutlined fontSize="small" color="white" />
      </Link>{' '}
    </Typography>
  );
};

const CloudStorageModal: React.FC<
  ModalWrapper<{
    unauthenticated: boolean;
    onLoginClick: () => void;
  }>
> = ({ open, onClose, onLoginClick, unauthenticated }) => {
  return (
    <InfoModal open={open} onClose={onClose} maxWidth={500} color="success">
      <Column textAlign="center" alignItems="center" py={2}>
        <Emoji
          symbol={unauthenticated ? '🚀' : '🎉'}
          label="icon"
          fontSize="4.5rem"
        />
        <Column gap={2}>
          <Typography typography={{ xs: 'h6', sm: 'h5' }}>
            {unauthenticated
              ? "Don't lose your progress!"
              : "You're using Charity.Games cloud storage!"}
          </Typography>

          <Typography typography={{ xs: 'body3', sm: 'body2' }}>
            {unauthenticated
              ? 'Get the most out of Charity.Games by logging in to save your progress in games. This means you can start a game on one device and continue playing on another device.'
              : 'Charity.Games uses cloud storage to save your progress in games. This means you can start a game on one device and continue playing on another device.'}
          </Typography>

          {unauthenticated ? (
            <Box display="flex" gap={2} width="100%" justifyContent="center">
              <Button
                variant="outlined"
                onClick={() => onClose?.({}, 'escapeKeyDown')}
                sx={{ px: 3 }}
              >
                Ignore
              </Button>
              <Button variant="arcade" color="success" onClick={onLoginClick}>
                Log in
              </Button>
            </Box>
          ) : (
            <Button
              variant="arcade"
              color="success"
              onClick={() => onClose?.({}, 'escapeKeyDown')}
              sx={{ px: 3 }}
            >
              Got it!
            </Button>
          )}
        </Column>
      </Column>
    </InfoModal>
  );
};

const PlayOverlay: FC<
  Pick<GameLoadingCoverProps, 'name' | 'iconUrl' | 'onPlay' | 'status'>
> = ({ name, iconUrl, onPlay, status }) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <>
      <Box
        sx={{
          height: { xs: 64, sm: 128, lg: 192 },
          width: { xs: 64, sm: 128, lg: 192 },
          borderRadius: (theme) => theme.shape.borderRadius,
          overflow: 'hidden',
          position: 'relative',
          border: '2px solid white',
        }}
      >
        <FillImage priority alt={`${name} icon`} src={iconUrl} />
      </Box>
      <Typography
        sx={(theme) => ({
          textAlign: 'center',
          fontFamily: theme.typography.mPlus1p.fontFamily,
          fontWeight: '700',
          color: theme.palette.white.main,
          fontSize: { xs: '1.5rem', sm: '2rem', lg: '2.5rem' },
        })}
      >
        {name}
      </Typography>
      <Button
        id={PLAY_NOW_BUTTON_ID}
        variant="arcade"
        disabled={status === 'loading'}
        startIcon={<PlayCircleOutline fontSize="inherit" />}
        size={isSmall ? 'small' : 'large'}
        color="success"
        onClick={onPlay}
      >
        Play now
      </Button>
    </>
  );
};
