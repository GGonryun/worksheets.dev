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
  urls,
  useLayout,
  useTimeout,
  useUser,
  warn,
} from '@worksheets/ui/common';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export function LoginPage() {
  const { push } = useRouter();
  const { user, signInProvider } = useUser();
  const [loading, setLoading] = useState(true);
  const { isMobile } = useLayout();

  useTimeout(() => {
    if (user) {
      push(urls.app.projects);
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
      .then(() => push(urls.app.projects))
      .catch(warn('failed to log in with github'))
      .finally(() => setLoading(false));
  }

  function handleLoginWithGoogle() {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    provider.addScope('profile');
    provider.addScope('email');

    signInProvider(provider)
      .then(() => push(urls.app.projects))
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
      <Paper elevation={0} variant="outlined">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width={isMobile ? '100%' : 400}
          height={isMobile ? '100%' : 400}
          gap={2}
          p={isMobile ? 3 : 8}
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
                onClick={handleLoginWithGoogle}
              >
                Continue with Google
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLoginWithGithub}
                startIcon={<GitHubIcon />}
              >
                Continue with Github
              </Button>
              <Box display="flex" flexDirection="column" gap={2}>
                <Link href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL('/')}`}>
                  <Emoji code="pencil" /> Learn more
                </Link>{' '}
                <Link href={'/applications'}>
                  <Emoji code="books" /> Applications
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
