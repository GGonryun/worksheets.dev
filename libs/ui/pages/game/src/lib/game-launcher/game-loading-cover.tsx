import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import {
  KeyboardDoubleArrowDown,
  MobileOff,
  PlayCircleOutline,
  SvgIconComponent,
} from '@mui/icons-material';
import { GameSchema } from '@worksheets/util/types';
import { FillImage } from '@worksheets/ui/images';
import { RotateToLandscape, RotateToPortrait } from '@worksheets/ui/icons';

export type GameLoadingCoverProps = {
  backgroundUrl: string;
  iconUrl: string;
  name: string;
  platforms: GameSchema['platforms'];
  orientations: GameSchema['orientations'];
  isMobileOrTablet: boolean;
  deviceOrientation: OrientationType;
  onPlay: () => void;
};

export const GameLoadingCover: FC<GameLoadingCoverProps> = ({
  name,
  backgroundUrl,
  iconUrl,
  platforms,
  orientations,
  onPlay,
  isMobileOrTablet,
  deviceOrientation,
}) => {
  const isPortrait =
    deviceOrientation === 'portrait-primary' ||
    deviceOrientation === 'portrait-secondary';

  const isLandscape =
    deviceOrientation === 'landscape-primary' ||
    deviceOrientation === 'landscape-secondary';

  const supportsMobile = platforms?.includes('mobile') && isMobileOrTablet;

  const showNoMobileOverlay = isMobileOrTablet && !supportsMobile;
  const showNoPortraitOverlay =
    isMobileOrTablet && isPortrait && !orientations.includes('portrait');
  const showNoLandscapeOverlay =
    isMobileOrTablet && !orientations?.includes('landscape') && isLandscape;

  const showOverlays =
    showNoMobileOverlay || showNoPortraitOverlay || showNoLandscapeOverlay;

  return (
    <Box
      sx={{
        position: 'relative',
        // fill the parent container.
        height: '100%',
        width: '100%',
        overflow: 'hidden',
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
        {showNoMobileOverlay && <DoesNotSupportMobileOverlay />}
        {showNoLandscapeOverlay && <DoesNotSupportLandscapeOverlay />}
        {showNoPortraitOverlay && <DoesNotSupportPortraitOverlay />}

        {!showOverlays && (
          <PlayOverlay name={name} iconUrl={iconUrl} onPlay={onPlay} />
        )}
      </Box>
    </Box>
  );
};

const DoesNotSupportMobileOverlay: FC = () => (
  <DoesNotSupportOverlay
    PrimaryIcon={MobileOff}
    SecondaryIcon={KeyboardDoubleArrowDown}
    primary="Play something else?"
    secondary="This game does not support mobile."
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
    <Typography
      sx={{
        fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
        color: (theme) => theme.palette.white.main,
        fontWeight: '900',
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
    {SecondaryIcon && <SecondaryIcon color="white" sx={{ fontSize: '3rem' }} />}
  </>
);

const PlayOverlay: FC<
  Pick<GameLoadingCoverProps, 'name' | 'iconUrl' | 'onPlay'>
> = ({ name, iconUrl, onPlay }) => (
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
        fontFamily: theme.typography.dangrek.fontFamily,
        color: theme.palette.white.main,
        fontSize: { xs: '1.5rem', sm: '2rem', lg: '2.5rem' },
      })}
    >
      {name}
    </Typography>
    <Button
      variant="contained"
      endIcon={<PlayCircleOutline fontSize="inherit" />}
      color="error"
      onClick={onPlay}
      sx={{
        paddingX: 6,
        paddingY: { xs: 0.5, sm: 0.75, lg: 1 },
        borderRadius: 20,
        fontFamily: (theme) => theme.typography.dangrek.fontFamily,
        fontSize: { xs: '1rem', sm: '1.25rem', lg: '1.5rem' },
      }}
    >
      Play now
    </Button>
  </>
);
