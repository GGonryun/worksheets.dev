import { Container } from '@mui/material';
import { UnderConstruction } from '../components/UnderConstruction';
import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { HeaderText, QuoteText } from '../components/Typography';

const Page: NextPageWithLayout = () => (
  <Container
    sx={{
      py: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}
  >
    <HeaderText>Our Cookies Policy</HeaderText>
    <UnderConstruction>
      <QuoteText
        text="True joy of nature is when every drop of water shines like a pearl."
        author="Anamika Mishra"
      />
    </UnderConstruction>
  </Container>
);

Page.getLayout = (page) => {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Page;
