import { useGoogleAdsense } from '@worksheets/ui/advertisements';
import { MixedGrid } from '@worksheets/ui-charity';
import { mixedItems } from '../util/mixed-items';
import Container from '@mui/material/Container';

export const HomePageContainer = () => {
  useGoogleAdsense();

  return (
    <Container sx={{ py: 2 }}>
      <MixedGrid items={mixedItems()} />
    </Container>
  );
};
