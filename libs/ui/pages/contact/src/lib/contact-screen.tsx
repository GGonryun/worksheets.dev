import {
  EmailOutlined,
  Favorite,
  GitHub,
  HelpCenter,
  Login,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Typography,
  TypographyProps,
} from '@mui/material';
import urls from '@worksheets/util/urls';
import React, { FC } from 'react';

const Title: React.FC<TypographyProps> = (props) => (
  <Typography
    color="text.arcade"
    sx={{
      typography: { xs: 'h4', sm: 'h3' },
    }}
    {...props}
  />
);
const Subtitle: React.FC<TypographyProps> = (props) => (
  <Typography
    color="text.arcade"
    sx={{
      typography: { xs: 'h6', sm: 'h5' },
    }}
    {...props}
  />
);

const Text: React.FC<TypographyProps> = (props) => (
  <Typography
    color="text.arcade"
    sx={{
      typography: { xs: 'body2', sm: 'body1' },
    }}
    {...props}
  />
);

export const ContactScreen: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 2 }}>
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, sm: 4 },
        gap: 2,
        backgroundColor: (theme) => theme.palette.background['solid-blue'],
        background: (theme) => theme.palette.background['gradient-blue'],
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Title>Contact Us</Title>
        <Box display="flex" gap={1}>
          <Button variant="square" size="small" href="/help" color="warning">
            <HelpCenter />
          </Button>
          <Button
            variant="square"
            size="small"
            href="/charity"
            color="secondary"
          >
            <Favorite />
          </Button>
        </Box>
      </Box>
      <EmailUsSection />
      <br />
      <SignUpSection />
      <br />
      <BugsAndFeaturesSection />
      <br />
    </Paper>
  </Container>
);

const EmailUsSection: FC = () => {
  return (
    <Box>
      <Subtitle>Need help?</Subtitle>
      <Text>
        Have a question about our platform or a game? Send us a message and
        we&apos;ll get back to you as soon as possible.
      </Text>
      <Box mt={2}>
        <Button
          variant="arcade"
          color="error"
          href={`mailto:${urls.email.support}`}
          startIcon={<EmailOutlined />}
        >
          Email Us
        </Button>
      </Box>
    </Box>
  );
};

const SignUpSection: FC = () => (
  <Box>
    <Subtitle>Stay up to date</Subtitle>
    <Text>
      We&apos;re always adding new games and features. Create an account to join
      our newsletter and stay up to date. We promise not to spam you!
    </Text>
    <Box mt={2}>
      <Button
        variant="arcade"
        color="error"
        href="/login"
        startIcon={<Login />}
      >
        Sign Up
      </Button>
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
    <Subtitle>Report bugs and request features</Subtitle>
    <Text>
      Charity Games uses{' '}
      <Link color="inherit" href={urls.social.github}>
        GitHub
      </Link>{' '}
      as our public issues tracker for organizing bugs and feature requests.
      Please use the links below to report bugs or request features. Do not
      share private data as our issues tracker is public.
    </Text>
    <Box mt={2}>
      <Button
        variant="arcade"
        color="error"
        href={urls.social.github}
        startIcon={<GitHub />}
      >
        GitHub
      </Button>
    </Box>
  </Box>
);
