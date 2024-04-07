import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  CharityBook,
  CharityBox,
  CharityWater,
} from '@worksheets/icons/charity';
import { routes } from '@worksheets/routes';
import { BLOG_BASE_URL } from '@worksheets/ui/env';

import { RedirectBox } from './redirect-box';

export const SupportSection = () => (
  <Paper
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      p: { xs: 2, sm: 4 },
      gap: 4,
      color: 'text.arcade',
      backgroundColor: 'background.solid-blue',
      background: (theme) => theme.palette.background['gradient-blue'],
    }}
  >
    <Typography typography={{ xs: 'h5', sm: 'h4' }} textAlign="center" my={1}>
      Together, we can make a difference
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        gap: 6,
      }}
    >
      <RedirectBox
        title="Check out our blog"
        description="Learn more about our impact, web games, and working with us."
        Icon={CharityBook}
        action={{
          href: BLOG_BASE_URL,
          label: 'Read More',
          color: 'warning',
        }}
      />
      <RedirectBox
        title="Share your game"
        description="Donate a game to our platform and help us make a difference."
        Icon={CharityBox}
        action={{
          href: routes.account.submissions.path(),
          label: 'Submit a game',
          color: 'secondary',
        }}
      />
      <RedirectBox
        title="Get to know us"
        description="We're on a mission to make the world a better place."
        Icon={CharityWater}
        action={{
          href: routes.about.path(),
          label: 'About us',
          color: 'warning',
        }}
      />
    </Box>
  </Paper>
);
