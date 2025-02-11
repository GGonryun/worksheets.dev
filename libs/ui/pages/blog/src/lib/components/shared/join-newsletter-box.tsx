import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { playRoutes } from '@worksheets/routes';
import { FC } from 'react';

export const JoinNewsletterBox: FC = () => (
  <Box color="text.arcade" display="flex" flexDirection="column" gap={1}>
    <Typography variant="h5">Join our newsletter</Typography>
    <Typography variant="body1">
      Create an account and subscribe to our newsletter to receive the latest
      news about game releases and blog posts. We'll only send emails once a
      week. No spam. No ads.
    </Typography>
    <Box mt={2} alignSelf="flex-end">
      <Button
        href={playRoutes.newsletter.subscribe.url()}
        variant="arcade"
        color="error"
        endIcon={<ArrowForward sx={{ ml: -0.5 }} />}
      >
        <b>Sign Up</b>
      </Button>
    </Box>
  </Box>
);
