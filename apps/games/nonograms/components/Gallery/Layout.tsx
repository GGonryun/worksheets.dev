import { Box } from '@mui/material';
import { backgroundColor } from '@worksheets/ui-games';
import { FC, ReactNode } from 'react';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      px: 2,
      py: 1,
      backgroundColor: (theme) => backgroundColor(theme),
    }}
  >
    {children}
  </Box>
);
