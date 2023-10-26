import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Box } from '@mui/material';
import {
  HeaderText,
  ParagraphText,
  QuoteText,
  SmallHeaderText,
} from '../components/Typography';
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
    {/* TODO: https://github.com/vercel/next.js/tree/canary/examples/blog-starter */}
    {/* TODO: https://nextjs.org/blog/markdown */}
    <HeaderText>Blog</HeaderText>
    <UnderConstruction>
      <>
        <SmallHeaderText>Coming Soon</SmallHeaderText>
        <ParagraphText>
          We are currently working on a blog. We will talk about our progress,
          our partners, and promote other organizations that are using video
          games to make the world a better place.
        </ParagraphText>
        <QuoteText
          text="Billions of people around the world are continuing to suffer from poor access to water, sanitation and hygiene. Globally, 1 in 3 people do not have access to safe drinking water."
          author="World Health Organization"
        />
      </>
    </UnderConstruction>
  </Box>
);

Page.getLayout = (page) => {
  return <WebsiteLayout hideNavigationBar>{page}</WebsiteLayout>;
};

export default Page;
