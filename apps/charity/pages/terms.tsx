import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Container } from '@mui/material';
import { HeaderText, QuoteText } from '../components/Typography';
import { UnderConstruction } from '../components/UnderConstruction';

const Page: NextPageWithLayout = () => (
  <Container
    sx={{
      py: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}
  >
    <HeaderText>Our Terms & Conditions</HeaderText>
    <UnderConstruction>
      <QuoteText
        text="Nothing is softer or more flexible than water, yet nothing can resist it."
        author="Lao Tzu"
      />
    </UnderConstruction>
  </Container>
);

Page.getLayout = (page) => {
  return <WebsiteLayout hideNavigationBar>{page}</WebsiteLayout>;
};

export default Page;
