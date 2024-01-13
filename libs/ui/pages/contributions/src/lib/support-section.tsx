import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  CharityBook,
  CharityBox,
  CharityWater,
} from '@worksheets/icons/charity';

import { RedirectBox } from './redirect-box';
import { TitleText } from './title-text';

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
    }}
  >
    <TitleText variant="h1" textAlign="center" my={1}>
      Together, we can make a difference
    </TitleText>
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
          href: '/blog',
          label: 'Read More',
          variant: 'outlined',
        }}
      />
      <RedirectBox
        title="Share your game"
        description="Donate a game to our platform and help us make a difference."
        Icon={CharityBox}
        action={{
          href: '/account/submissions',
          label: 'Submit a game',
          variant: 'contained',
        }}
      />
      <RedirectBox
        title="Get to know us"
        description="We're on a mission to make the world a better place."
        Icon={CharityWater}
        action={{
          href: '/about',
          label: 'About us',
          variant: 'outlined',
        }}
      />
    </Box>
  </Paper>
);
