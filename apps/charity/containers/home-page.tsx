import { MixedGrid } from '@worksheets/ui-charity';
import { mixedItems } from '../util/mixed-items';
import { useGoogleAds } from './useGoogleAds';
import Container from '@mui/material/Container';

export const HomePageContainer = () => {
  useGoogleAds();

  return (
    <Container sx={{ py: 2 }}>
      <MixedGrid items={mixedItems()} />
    </Container>
  );
};
