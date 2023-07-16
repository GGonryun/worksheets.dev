import {
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import {
  Emoji,
  GitHubIcon,
  GoogleIcon,
  OpenInNewTabLink,
  useTimeout,
  warn,
} from '@worksheets/ui/common';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '@worksheets/util/auth/client';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export function LoginPage() {
  const { push } = useRouter();
  const { user, signInProvider } = useUser();
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    if (user) {
      push('/dashboard');
    } else {
      setLoading(false);
    }
  }, 2500);

  function handleLoginWithGithub() {
    setLoading(true);
    const provider = new GithubAuthProvider();

    provider.addScope('profile');
    provider.addScope('email');

    signInProvider(provider)
      .then(() => push(`/dashboard`))
      .catch(warn('failed to log in with github'))
      .finally(() => setLoading(false));
  }

  function handleLoginWithGoogle() {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    provider.addScope('profile');
    provider.addScope('email');

    signInProvider(provider)
      .then(() => push(`/dashboard`))
      .catch(warn('failed to log in with google'))
      .finally(() => setLoading(false));
  }

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={10}>
        <Box
          width="300px"
          height="320px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={2}
          p={3}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Box pb={2}>
                <Typography variant="h6">Log in to</Typography>
                <Typography variant="h4" color="primary">
                  <Link href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL()}'`}>
                    Worksheets.dev
                  </Link>
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
                fullWidth
                onClick={handleLoginWithGoogle}
              >
                Continue with Google
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                onClick={handleLoginWithGithub}
                startIcon={<GitHubIcon />}
              >
                Continue with Github
              </Button>
              <Box display="flex" flexDirection="column" gap={2}>
                <OpenInNewTabLink
                  href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL('/')}`}
                >
                  <Emoji label="docs page" symbol={128218} /> Learn more
                </OpenInNewTabLink>{' '}
                <OpenInNewTabLink href={'/apps'}>
                  <Emoji label="apps page" symbol={127881} /> Applications
                </OpenInNewTabLink>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
