import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { WebsiteBackground } from './wallpaper';

export const StoryWallpaper: React.FC<{
  hideBlobs?: boolean;
  children: ReactNode;
}> = ({ hideBlobs, children }) => (
  <Box
    sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}
  >
    <WebsiteBackground hideBlobs={hideBlobs} />
    {children}
  </Box>
);
