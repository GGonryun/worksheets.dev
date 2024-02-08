import { Menu } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { raffleCategoryLabels } from '@worksheets/ui/components/raffles';
import { FilterableRaffleCategory } from '@worksheets/util/types';
import React from 'react';

import { CategoryMenu } from './category-menu';

export const ChangeCategory: React.FC<{
  category: FilterableRaffleCategory;
  setCategory: (c: FilterableRaffleCategory) => void;
}> = ({ category, setCategory }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <CategoryMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        category={category}
        setCategory={setCategory}
      />
      <Box
        component="a"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <Menu sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
        <Typography
          sx={{
            typography: { xs: 'h6', sm: 'h4' },
          }}
        >
          {raffleCategoryLabels[category]}
        </Typography>
      </Box>
    </>
  );
};
