'use client';

import { Container, Link, Paper, Typography } from '@mui/material';
import { playRoutes } from '@worksheets/routes';
import { BookmarkAnchor } from '@worksheets/ui-core';
import { destroyAllData } from '@worksheets/util/storage';
import { signOut } from 'next-auth/react';
import { FC } from 'react';

import { CookiesStatement } from './cookie-policy-statement';

export type CookiePolicyScreenProps = {
  //none
};

export const CookiePolicyScreen: FC<CookiePolicyScreenProps> = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          color: 'text.arcade',
          backgroundColor: 'background.solid-blue',
        }}
      >
        <BookmarkAnchor id={'top'} />
        <CookiesStatement />
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: { xs: 2, sm: 4 },
          }}
        >
          <Link href="#top" color="inherit">
            Back to the top
          </Link>
          <Link href={playRoutes.home.path()} color="inherit">
            Home Page
          </Link>
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              destroyAllData();
              alert('Your local storage and cookies have been cleared.');
              window.location.reload();
              signOut({ callbackUrl: playRoutes.cookies.path() });
            }}
            color="inherit"
          >
            Clear cookies
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};
