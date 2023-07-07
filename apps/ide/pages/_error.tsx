import { OpenInNew } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { NextPage } from 'next';
import React from 'react';

interface Error {
  statusCode?: number | null | undefined;
}

const Error: NextPage<Error> = ({ statusCode }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={5}
      width="100%"
      height="100%"
    >
      <Button
        data-test-id="the-error-bell"
        onClick={() => {
          alert('no, the other one.');
        }}
      >
        🛎️
      </Button>
      <Typography variant="h2">
        {statusCode
          ? `A ${statusCode} error occurred on the server`
          : 'An error occurred on client'}
      </Typography>
      <Button variant="contained" size="large" href="/">
        Return to the homepage
      </Button>

      <Typography>We&apos;ve been alerted about this error.</Typography>
      <Typography>
        Please{' '}
        <Link
          href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us')}`}
          target="_blank"
        >
          contact us <OpenInNew fontSize="inherit" />{' '}
        </Link>
        if you think this is a mistake. Or press this bell really hard.
      </Typography>
      <Button data-test-id="the-error-bell">🛎️</Button>
    </Box>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
