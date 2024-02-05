import { Box, Paper, Typography } from '@mui/material';
import { PrizeSchema } from '@worksheets/util/types';
import { ReactNode } from 'react';

import { PrizeCarousel } from './prize-carousel';

export const TitledPrizeCarousel: React.FC<{
  items: PrizeSchema[];
  title: string;
  action?: ReactNode;
}> = ({ items, title, action }) => {
  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pb={{ xs: 1.5, sm: 2.5 }}
        sx={{
          color: 'text.arcade',
        }}
      >
        <Typography
          sx={{
            typography: { xs: 'h5', sm: 'h4' },
          }}
        >
          {title}
        </Typography>
        {Boolean(action) && action}
      </Box>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: (theme) => theme.shape.borderRadius,
          background: (theme) => theme.palette.background['solid-blue'],
          padding: { xs: 1, sm: 2 },
          gap: { xs: 2, sm: 4 },
        }}
      >
        <PrizeCarousel items={items} />
      </Paper>
    </Box>
  );
};
