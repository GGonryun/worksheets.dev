import {
  EmailOutlined,
  Favorite,
  HelpCenter,
  Login,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TypographyProps,
} from '@mui/material';
import { routes } from '@worksheets/ui/routes';
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
          <Button
            variant="square"
            size="small"
            href={routes.help.path()}
            color="warning"
          >
            <HelpCenter />
          </Button>
          <Button
            variant="square"
            size="small"
            href={routes.about.path()}
            color="secondary"
          >
            <Favorite />
          </Button>
        </Box>
      </Box>
      <br />
      <EmailUsSection />
      <br />
      <SignUpSection />
      <br />
    </Paper>
  </Container>
);

const EmailUsSection: FC = () => {
  return (
    <Box>
      <Subtitle>Need help?</Subtitle>
      <Text>
        Have a question about our platform or a game? Did you find a bug on our
        website? Or maybe there is some feedback you would like to share? Send
        us a message and we will get back to you as soon as possible.
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
      We are always adding new games and features. Create an account to join our
      newsletter and stay up to date. We promise not to spam you!
    </Text>
    <Box mt={2}>
      <Button
        variant="arcade"
        color="error"
        href={routes.login.path()}
        startIcon={<Login />}
      >
        Sign Up
      </Button>
    </Box>
  </Box>
);
