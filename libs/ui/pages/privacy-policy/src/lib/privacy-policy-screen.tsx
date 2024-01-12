import { Box, Container, Link, Paper, Typography } from '@mui/material';
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
        }}
      >
        <Box
          component="a"
          id={'top'}
          sx={{
            display: 'block',
            position: 'relative',
            top: { xs: -40, sm: -60 },
            visibility: 'hidden',
          }}
        />
        <PrivacyStatement />
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: { xs: 2, sm: 4 },
          }}
        >
          <Link href="#top">Back to the top</Link>
          <Link href="/">Home Page</Link>
        </Typography>
      </Paper>
    </Container>
  );
};
