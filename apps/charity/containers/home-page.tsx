import { Container } from '@mui/material';
import { MixedGrid } from '@worksheets/ui-charity';
import { mixedItems } from '../util/mixed-items';

export const HomePageContainer = () => (
  <Container sx={{ py: 2 }}>
    <MixedGrid items={mixedItems()} />
  </Container>
);
