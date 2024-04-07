import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

export const PanelBox: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    {children}
  </Box>
);
