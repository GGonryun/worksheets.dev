import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Box, TextField } from '@mui/material';

import {
  HeaderText,
  ParagraphText,
  SubHeaderText,
} from '../components/Typography';
import { FC } from 'react';
import { CharityGamesLink, urls } from '@worksheets/ui-games';
import { PrimaryLink } from '../components/Links';
import { SubmissionButton } from '../components/Buttons';

const EmailUsSection: FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}
  >
    <SubHeaderText>Need help?</SubHeaderText>
    <ParagraphText>
      Please contact us using a valid email address, otherwise we will not be
      able to process your request. We try our best to get back to you within 36
      hours.
    </ParagraphText>
    <Box pt={1}>
      <SubmissionButton href={urls.mailTo.gwenythAdmin}>
        Email support
      </SubmissionButton>
    </Box>
  </Box>
);

const JoinOurNewsletterSection: FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}
  >
    <SubHeaderText>Stay up to date</SubHeaderText>
    <ParagraphText>
      We&apos;re always adding new games and features. Join our newsletter to
      stay up to date. We promise not to spam you.
    </ParagraphText>
    <TextField label="Email" variant="outlined" />
    <Box pt={1}>
      <SubmissionButton
        onClick={() => {
          alert('TODO: handle submission');
        }}
      >
        Join newsletter
      </SubmissionButton>
    </Box>
  </Box>
);

const BugsAndFeaturesSection: FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}
  >
    <SubHeaderText>Report bugs and request features</SubHeaderText>
    <ParagraphText>
      <CharityGamesLink /> uses GitHub as our public issues tracker for
      organizing bugs and feature requests. Please use the links below to report
      bugs or request features. Do not share private data as our issues tracker
      is public.
    </ParagraphText>
    <PrimaryLink href={urls.social.github}>View current issues</PrimaryLink>
    <PrimaryLink href={urls.social.github}>Open a new issue</PrimaryLink>
  </Box>
);

const Page: NextPageWithLayout = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      p: 3,
      gap: 5,
    }}
  >
    <HeaderText>Support & Contact</HeaderText>
    <EmailUsSection />
    <JoinOurNewsletterSection />
    <BugsAndFeaturesSection />
  </Box>
);

Page.getLayout = (page) => {
  return <WebsiteLayout hideNavigationBar>{page}</WebsiteLayout>;
};

export default Page;
