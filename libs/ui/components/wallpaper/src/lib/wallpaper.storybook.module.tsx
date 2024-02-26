import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

import { WALLPAPER_IMAGES } from './const';

export const StoryWallpaper: React.FC<
  {
    children: ReactNode;
  } & Pick<BoxProps, 'm' | 'p' | 'mx' | 'px' | 'my' | 'py'>
> = ({ children, ...mp }) => (
  <Box
    sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}
  >
    <Box {...mp}>
      <Box
        sx={{
          zIndex: -5,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle, rgba(43,217,255,1) 0%, rgba(13,106,215,1) 50%, rgba(0,33,71,1) 100%)`,
        }}
      />
      <Box
        sx={{
          zIndex: -4,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: `rgb(43,217,255)`,
          backgroundImage: `url('${WALLPAPER_IMAGES.gems}')`,
          backgroundBlendMode: 'color-dodge',
          backgroundRepeat: 'repeat',
          opacity: 0.1,
        }}
      />
      {children}
    </Box>
  </Box>
);
