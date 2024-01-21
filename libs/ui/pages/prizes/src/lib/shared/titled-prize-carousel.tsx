import { Box, Typography } from '@mui/material';

import { PrizeSchema } from '../../types/prizes';
import { CustomPaper } from './custom-paper';
import { PrizesCarousel } from './prizes-carousel';

export const TitledPrizeCarousel: React.FC<{
  items: PrizeSchema[];
  title: string;
}> = ({ items, title }) => {
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
      <CustomPaper
        sx={{
          background: (theme) => theme.palette.background['solid-blue'],
          gap: 4,
        }}
      >
        <PrizesCarousel items={items} />
      </CustomPaper>
    </Box>
  );
};
