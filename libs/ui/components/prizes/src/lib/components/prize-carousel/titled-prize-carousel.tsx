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
      <Typography
        color="primary.contrastText"
        pb={{ xs: 1, sm: 2 }}
        sx={{
          typography: { xs: 'h6', sm: 'h4' },
        }}
      >
        {title}
      </Typography>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: (theme) => theme.shape.borderRadius,
          background: (theme) => theme.palette.background['solid-blue'],
          padding: { xs: 2, sm: 4 },
          gap: { xs: 2, sm: 4 },
        }}
      >
        <PrizeCarousel items={items} />
        {action ? null : action}
      </Paper>
    </Box>
  );
};
