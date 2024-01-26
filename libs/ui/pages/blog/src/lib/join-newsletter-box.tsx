import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';

export const JoinNewsletterBox: FC = () => (
  <Box color="text.arcade">
    <Typography variant="h5">Join our newsletter</Typography>
    <Typography variant="body2">
      Create an account and subscribe to our newsletter to receive the latest
      news about game releases and blog posts. We'll only send emails once a
      week. No spam. No ads.
    </Typography>
    <Box mt={2}>
      <Button
        href="/login"
        variant="arcade"
        color="error"
        endIcon={<ArrowForward sx={{ ml: -0.5 }} />}
      >
        <b>Sign Up</b>
      </Button>
    </Box>
  </Box>
);
