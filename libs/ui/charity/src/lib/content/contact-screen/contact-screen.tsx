import { EmailOutlined, GitHub } from '@mui/icons-material';
import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { ArrowUpRight } from '../../icons/arrow-up-right';
import { urls } from '../../layout/util';

export type ContactScreenProps = {
  // no props
};

export const ContactScreen: FC<ContactScreenProps> = (props) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 1, sm: 3 },
        }}
      >
        <Typography variant="h3">Contact Us</Typography>
        <br />
        <EmailUsSection />
        <br />
        <SignUpSection />
        <br />
        <BugsAndFeaturesSection />
      </Paper>
    </Container>
  );
};

const EmailUsSection: FC = () => (
  <Box>
    <Typography variant="h5">Need help?</Typography>
    <Typography variant="body1">
      Have a question about our platform or a game? Send us a message and
      we&apos;ll get back to you as soon as possible.
      <Box mt={1}>
        <Button
          variant="contained"
          color="error"
          href="mailto:amodestduck@gmail.com"
          size="small"
          startIcon={<EmailOutlined />}
          sx={{
            fontWeight: 900,
            lineHeight: 1,
            borderRadius: 4,
            px: 3,
          }}
        >
          Email Us
        </Button>
      </Box>
    </Typography>
  </Box>
);

const SignUpSection: FC = () => (
  <Box>
    <Typography variant="h5">Stay up to date</Typography>
    <Typography variant="body1">
      We&apos;re always adding new games and features. Create an account to join
      our newsletter and stay up to date. We promise not to spam you!
    </Typography>
    <Box mt={1}>
      <Button
        variant="contained"
        color="error"
        href="/login"
        size="small"
        endIcon={<ArrowUpRight sx={{ ml: -0.5 }} />}
        sx={{
          fontWeight: 900,
          lineHeight: 1,
          borderRadius: 4,
          px: 3,
        }}
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
    <Typography variant="h5">Report bugs and request features</Typography>
    <Typography>
      Charity Games uses <Link href={urls.social.github}>GitHub</Link> as our
      public issues tracker for organizing bugs and feature requests. Please use
      the links below to report bugs or request features. Do not share private
      data as our issues tracker is public.
      <Box mt={1}>
        <Button
          variant="contained"
          color="error"
          href={urls.social.github}
          size="small"
          startIcon={<GitHub />}
          sx={{
            fontWeight: 900,
            lineHeight: 1,
            borderRadius: 4,
            px: 3,
          }}
        >
          GitHub
        </Button>
      </Box>
    </Typography>
  </Box>
);