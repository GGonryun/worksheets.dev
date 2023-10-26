import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Box } from '@mui/material';
import {
  HeaderText,
  ParagraphText,
  QuoteText,
  SmallHeaderText,
  SubHeaderText,
} from '../components/Typography';
import { SubmissionButton } from '../components/Buttons';
import { FullStoryLink, WaterOrgLink, urls } from '@worksheets/ui-games';
import { SecondaryLink } from '../components/Links';
import { LinkedIn } from '@mui/icons-material';

const Page: NextPageWithLayout = () => (
  <Box
    sx={{
      p: 3,
      pb: 6,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}
  >
    <HeaderText sx={{ pb: 3 }}>About Charity.Games</HeaderText>
    <SubHeaderText>Our Mission</SubHeaderText>
    <ParagraphText>
      Charity.Games is a non-profit organization dedicated to creating fun and
      free games that help support charitable causes. At Charity.Games we
      believe that everyone should have access to clean water. We also believe
      that everyone should have access to fun games. We combine these two ideas
      to create a platform that allows you to play fun games while also helping
      people in need. Every game you play on our platform generates water for
      people in need. We currently support <WaterOrgLink /> as our charity of
      choice.
    </ParagraphText>
    <ParagraphText>
      If you are tired of the ads and want to suggest a game, please{' '}
      <SecondaryLink href={urls.relative.contact}>contact us.</SecondaryLink>
      <br />
      <br />
      If you have a charity you would like to see us support, please{' '}
      <SecondaryLink href={urls.relative.contact}>contact us.</SecondaryLink>
    </ParagraphText>
    <Box pb={3}>
      <SubmissionButton>Explore Games</SubmissionButton>
    </Box>
    <SubHeaderText>The Team</SubHeaderText>
    <SmallHeaderText>Miguel Campos - Software Engineer</SmallHeaderText>
    <ParagraphText>
      <SecondaryLink href={urls.social.linkedIn}>Miguel</SecondaryLink> is
      currently a software engineer at <FullStoryLink /> and a graduate from San
      Diego State University. He is passionate about creating software that
      makes the world a better place. He is currently the lead developer of
      Charity.Games. Before working at FullStory, he worked at{' '}
      <SecondaryLink href={urls.g2ss()}>G2 Software Systems</SecondaryLink>,{' '}
      <SecondaryLink href={urls.sdsu()}>
        San Diego State University
      </SecondaryLink>
      , <SecondaryLink href={urls.usd()}>University of San Diego</SecondaryLink>
      , and <SecondaryLink href={urls.navwar()}>NAVWAR</SecondaryLink> as a
      Software Engineer.
    </ParagraphText>
    <ParagraphText>
      When Miguel is not working, he enjoys rock climbing, hiking, and playing
      board games with his friends. Miguel really hates writing about himself in
      the third person, but he is doing it anyway.
    </ParagraphText>
    <QuoteText
      text="Individually, we are one drop. Together, we are an ocean."
      author="Ryunosuke Satoro"
    />
    <Box>
      <SubmissionButton
        startIcon={<LinkedIn sx={{ height: 32, width: 32 }} />}
        href={urls.social.linkedIn}
      >
        Connect With Miguel
      </SubmissionButton>
    </Box>
  </Box>
);

Page.getLayout = (page) => {
  return <WebsiteLayout hideNavigationBar>{page}</WebsiteLayout>;
};

export default Page;
