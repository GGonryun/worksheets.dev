import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';

import { PrizeSchema } from '../../types/prizes';
import { CustomPaper } from './custom-paper';
import { PrizesCarousel } from './prizes-carousel';

export const TitledPrizeCarousel: React.FC<{
  items: PrizeSchema[];
  title: string;
  disableAction?: boolean;
}> = ({ items, title, disableAction }) => {
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
        {!disableAction && <SeeMoreButton />}
      </CustomPaper>
    </Box>
  );
};

const SeeMoreButton = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <Button
      href="/prizes/hottest"
      variant="arcade"
      color="error"
      size={isMobile ? 'small' : 'medium'}
      sx={{
        alignSelf: 'flex-end',
      }}
    >
      See More
    </Button>
  );
};
