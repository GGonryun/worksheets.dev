import { MixedGrid } from '@worksheets/ui-charity';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { Container } from '@mui/material';
import { gameItems } from '../../util/mixed-items';

const Page: NextPageWithLayout = () => (
  <Container
    maxWidth="lg"
    sx={{
      py: 2,
    }}
  >
    <MixedGrid items={gameItems()} />
  </Container>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
