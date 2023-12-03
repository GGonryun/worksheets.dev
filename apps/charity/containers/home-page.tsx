import { Box, Container } from '@mui/material';
import { MixedGrid } from '@worksheets/ui-charity';
import { mixedItems } from '../util/mixed-items';
import { HorizontalAdvertisementContainer } from './horizontal-advertisement-container';
import { useGoogleAds } from './useGoogleAds';

export const HomePageContainer = () => {
  useGoogleAds();

  return (
    <Container sx={{ py: 2 }}>
      <MixedGrid items={mixedItems()} />
      <Box mt={2}>
        <HorizontalAdvertisementContainer />
      </Box>
    </Container>
  );
};
