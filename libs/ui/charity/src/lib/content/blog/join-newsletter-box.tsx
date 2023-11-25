import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';

export const JoinNewsletterBox: FC = () => (
  <Box>
    <Typography variant="h5">Join our newsletter</Typography>
    <Typography variant="body3">
      Create an account and subscribe to our newsletter to receive the latest
      news about game releases and blog posts. We'll only send emails once a
      week. No spam. No ads.
    </Typography>
    <Box>
      <Button
        href="/login"
        variant="contained"
        color="error"
        size="large"
        endIcon={<ArrowForward sx={{ ml: -0.5 }} />}
        sx={{
          borderRadius: 8,
          px: 4,
          mt: 2,
        }}
      >
        Sign Up
      </Button>
    </Box>
  </Box>
);
