import { ExpandMore } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { prizeCategoryLabels } from '@worksheets/ui/components/prizes';
import React from 'react';

import { useRaffleScreenContext } from '../context';
import { CategoryMenu } from './category-menu';

export const ChangeCategory: React.FC = () => {
  const { category } = useRaffleScreenContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <CategoryMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
      <Box
        component="a"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          pb: { xs: 1, sm: 2 },
          '&:hover': {
            textDecoration: 'underline',
            textDecorationColor: 'white',
          },
        }}
      >
        <Typography
          color="primary.contrastText"
          sx={{
            typography: { xs: 'h6', sm: 'h4' },
          }}
        >
          {prizeCategoryLabels[category]}
        </Typography>
        <ExpandMore
          color="white"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
        />
      </Box>
    </>
  );
};
