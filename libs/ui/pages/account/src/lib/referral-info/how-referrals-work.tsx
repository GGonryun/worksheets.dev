import { Box, Link, Typography } from '@mui/material';
import { ListItem, UnorderedList } from '@worksheets/ui-core';

import {
  TOKENS_PER_REFERRAL_PLAY,
  TOKENS_PER_FRIEND_PLAY_DAILY_LIMIT,
  TOKENS_PER_REFERRAL_ACCOUNT,
} from '../const';

export const HowReferralsWork = () => (
  <Box>
    <Typography>
      <strong>How It Works</strong>
    </Typography>
    <UnorderedList>
      <ListItem disablePadding variant="body2">
        Earn {TOKENS_PER_REFERRAL_PLAY} tokens every time someone{' '}
        <Link href="/play">plays a game</Link> with your referral link. (Up{' '}
        {TOKENS_PER_FRIEND_PLAY_DAILY_LIMIT} tokens per day.)
      </ListItem>
      <ListItem disablePadding variant="body2">
        Earn {TOKENS_PER_REFERRAL_ACCOUNT} tokens when someone makes an account
        using your referral link.
      </ListItem>
    </UnorderedList>
  </Box>
);
