import { Box } from '@mui/material';
import React from 'react';

import { CustomPaper } from '../../shared/custom-paper';
import { ChangeCategory } from './change-category';
import { PrizesGroup } from './prizes-group';

// handle pagination automatically. only show 15 items at a time.
export const RaffleList: React.FC = () => (
  <Box mt={6} width="100%">
    <ChangeCategory />
    <CustomPaper
      sx={{
        background: (theme) => theme.palette.background['transparent-blue'],
        gap: 4,
      }}
    >
      <PrizesGroup />
    </CustomPaper>
  </Box>
);
