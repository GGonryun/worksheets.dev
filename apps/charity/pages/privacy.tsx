import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Container } from '@mui/material';
import { UnderConstruction } from '../components/UnderConstruction';
import { HeaderText, ParagraphText, QuoteText } from '@worksheets/ui-charity';

const Page: NextPageWithLayout = () => (
  <Container
    sx={{
      py: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}
  >
    <HeaderText>Our Privacy Policy</HeaderText>
    <UnderConstruction>
      <>
        <ParagraphText>
          Your Privacy is important to us. We are hard at work developing a
          proper privacy policy.
        </ParagraphText>
        <QuoteText
          text="The fall of dropping water wears away the Stone."
          author="Lucretius"
        />
      </>
    </UnderConstruction>
  </Container>
);

Page.getLayout = (page) => {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Page;
