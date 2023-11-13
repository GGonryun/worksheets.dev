import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Box, CircularProgress, Container, TextField } from '@mui/material';
import { FC } from 'react';
import { CharityGamesLink, urls } from '@worksheets/ui-games';
import { useSubscribeEmail } from '../hooks/useSubscribeEmail';
import {
  CaptionText,
  HeaderText,
  ParagraphText,
  PrimaryLink,
  SubHeaderText,
  SubmissionButton,
} from '@worksheets/ui-charity';

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
      <SubmissionButton href={urls.mailTo.personalEmail}>
        Email support
      </SubmissionButton>
    </Box>
  </Box>
);

const JoinOurNewsletterSection: FC = () => {
  const {
    email,
    error,
    success,
    isLoading,
    setEmail,
    subscribeEmail,
    keyboardSubscribeEmail,
  } = useSubscribeEmail();

  return (
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
      <TextField
        disabled={isLoading}
        placeholder="Enter your email"
        variant="outlined"
        value={email}
        onChange={setEmail}
        onKeyDown={keyboardSubscribeEmail}
      />
      {success && (
        <CaptionText
          sx={{
            color: (theme) => theme.palette.success.main,
          }}
        >
          {success}
        </CaptionText>
      )}
      {error && (
        <CaptionText
          sx={{
            color: (theme) => theme.palette.error.main,
          }}
        >
          {error}
        </CaptionText>
      )}
      <Box pt={1}>
        <SubmissionButton
          disabled={isLoading || !!success || !!error}
          onClick={subscribeEmail}
        >
          {isLoading ? <CircularProgress /> : 'Join Newsletter'}
        </SubmissionButton>
      </Box>
    </Box>
  );
};

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
  <Container
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
  </Container>
);

Page.getLayout = (page) => {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Page;
