import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import {
  KeyboardDoubleArrowDown,
  MobileOff,
  PlayCircleOutline,
} from '@mui/icons-material';
import { FillImage } from '../../../images/fill-image';
import { isMobileOrTabletDeviceBrowser } from '@worksheets/util-devices';
import { GameSchema } from '@worksheets/util/types';

export type GameLoadingCoverProps = {
  backgroundUrl: string;
  iconUrl: string;
  name: string;
  platforms?: GameSchema['platforms'];
  onPlay: () => void;
};

export const GameLoadingCover: FC<GameLoadingCoverProps> = ({
  name,
  backgroundUrl,
  iconUrl,
  platforms,
  onPlay,
}) => {
  const isMobileOrTablet = isMobileOrTabletDeviceBrowser();
  const supportsMobile = platforms?.includes('mobile') && isMobileOrTablet;

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
        {isMobileOrTablet && !supportsMobile ? (
          <DoesNotSupportMobileOverlay />
        ) : (
          <PlayOverlay name={name} iconUrl={iconUrl} onPlay={onPlay} />
        )}
      </Box>
    </Box>
  );
};

const DoesNotSupportMobileOverlay: FC = () => (
  <>
    <MobileOff color="white" sx={{ fontSize: '3rem' }} />
    <Typography
      sx={{
        fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
        color: (theme) => theme.palette.white.main,
        fontWeight: '900',
        fontSize: { xs: '1.25rem', sm: '1.5rem', lg: '1.75rem' },
        textAlign: 'center',
      }}
    >
      Play something else?
    </Typography>
    <Typography
      sx={{
        fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
        color: (theme) => theme.palette.white.main,
        fontSize: { xs: '0.8rem', sm: '1rem', lg: '1.2rem' },
        textAlign: 'center',
      }}
    >
      This game does not support mobile.
    </Typography>
    <KeyboardDoubleArrowDown color="white" sx={{ fontSize: '3rem' }} />
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
