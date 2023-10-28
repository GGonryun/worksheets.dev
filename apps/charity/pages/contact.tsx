import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Box, Container, TextField } from '@mui/material';
import {
  CaptionText,
  HeaderText,
  ParagraphText,
  SubHeaderText,
} from '../components/Typography';
import { FC, useState } from 'react';
import { CharityGamesLink, urls } from '@worksheets/ui-games';
import { PrimaryLink } from '../components/Links';
import { SubmissionButton } from '../components/Buttons';
import { trpc } from '@worksheets/trpc-charity';
import { handleEmailSubscribeError as parseEmailSubscribeError } from '../util/errors';

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

const JoinOurNewsletterSection: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const subscribe = trpc.emails.subscribe.useMutation();

  const handleUpdateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubscribe = async () => {
    try {
      await subscribe.mutateAsync({ address: email });
      setSuccess('You have been subscribed to our newsletter!');
    } catch (error) {
      setError(parseEmailSubscribeError(error));
    }
  };
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
        disabled={subscribe.isLoading}
        placeholder="Enter your email"
        variant="outlined"
        value={email}
        onChange={handleUpdateEmail}
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
          disabled={subscribe.isLoading || !email || !!success || !!error}
          onClick={handleSubscribe}
        >
          Join newsletter
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
  return <WebsiteLayout hideNavigationBar>{page}</WebsiteLayout>;
};

export default Page;
