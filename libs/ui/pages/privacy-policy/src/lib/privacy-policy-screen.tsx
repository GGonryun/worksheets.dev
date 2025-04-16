import { Container, Link, Paper, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { BookmarkAnchor } from '@worksheets/ui-core';
import { FC } from 'react';

import { PrivacyStatement } from './privacy-policy-statement';

export type PrivacyPolicyScreenProps = {
  //none
};

export const PrivacyPolicyScreen: FC<PrivacyPolicyScreenProps> = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          color: 'text.arcade',
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
        }}
      >
        <BookmarkAnchor id={'top'} />
        <Typography variant="h4">Global Privacy Statement</Typography>
        <br />
        <PrivacyStatement />
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
          <Link href={routes.home.path()} color="inherit">
            Home Page
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};
