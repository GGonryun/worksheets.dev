import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { Container } from '@mui/material';
import { tagItems } from '../../util/mixed-items';
import { MixedGrid } from '@worksheets/ui-charity';

const Page: NextPageWithLayout = () => (
  <Container
    maxWidth="lg"
    sx={{
      py: 2,
    }}
  >
    <MixedGrid items={tagItems()} />
  </Container>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
