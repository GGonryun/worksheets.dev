import {
  DesktopAccessDisabled,
  KeyboardDoubleArrowDown,
  MobileOff,
  PlayCircleOutline,
  SvgIconComponent,
} from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { FillImage } from '@worksheets/ui/components/images';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { GameSchema } from '@worksheets/util/types';
import { FC } from 'react';

import { useDeviceInformation } from '../../hooks/use-device-information';
import { RotateToLandscape } from '../icons/rotate-to-landscape';
import { RotateToPortrait } from '../icons/rotate-to-portrait';

export type GameLoadingCoverProps = {
  backgroundUrl: string;
  iconUrl: string;
  name: string;
  viewport: GameSchema['viewport'];
  onPlay: () => void;
  isLoading: boolean;
};

export const GameLoadingCover: FC<GameLoadingCoverProps> = ({
  name,
  backgroundUrl,
  iconUrl,
  viewport,
  onPlay,
  isLoading,
}) => {
  const {
    showNoDesktopOverlay,
    showNoLandscapeOverlay,
    showNoMobileOverlay,
    showNoPortraitOverlay,
  } = useDeviceInformation(viewport);

  return (
    <Box
      sx={{
        position: 'relative',
        // fill the parent container.
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: (theme) => theme.shape.borderRadius * 2,
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
        {showNoDesktopOverlay ? (
          <DoesNotSupportDesktopOverlay />
        ) : showNoMobileOverlay ? (
          <DoesNotSupportMobileOverlay />
        ) : showNoLandscapeOverlay ? (
          <DoesNotSupportLandscapeOverlay />
        ) : showNoPortraitOverlay ? (
          <DoesNotSupportPortraitOverlay />
        ) : (
          <PlayOverlay
            isLoading={isLoading}
            name={name}
            iconUrl={iconUrl}
            onPlay={onPlay}
          />
        )}
      </Box>
    </Box>
  );
};

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
    <Box>
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

const PlayOverlay: FC<
  Pick<GameLoadingCoverProps, 'name' | 'iconUrl' | 'onPlay' | 'isLoading'>
> = ({ name, iconUrl, onPlay, isLoading }) => {
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
        variant="arcade"
        disabled={isLoading}
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
