import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Box } from '@mui/material';
import { HeaderText, ParagraphText, QuoteText } from '../components/Typography';
import { UnderConstruction } from '../components/UnderConstruction';

const Page: NextPageWithLayout = () => (
  <Box
    sx={{
      p: 3,
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
  </Box>
);

Page.getLayout = (page) => {
  return <WebsiteLayout hideNavigationBar>{page}</WebsiteLayout>;
};

export default Page;