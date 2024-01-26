import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

import { WebsiteBackground } from './wallpaper';

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
      <WebsiteBackground />
      {children}
    </Box>
  </Box>
);
