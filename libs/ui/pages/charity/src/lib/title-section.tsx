import { HowToVote } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { FC } from 'react';

import { CustomPaper } from './custom-paper';

export const TitleSection: FC = () => (
  <CustomPaper>
    <Typography variant="h3" sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}>
      Play With Purpose
    </Typography>
    <Typography>
      Every game you play generates a small amount of revenue that will be
      donated to charity. Every week we will donate the total amount of revenue
      generated to a charity of your choice.
    </Typography>
    <Typography variant="body3" sx={{ mt: 1 }}>
      <Link
        href="/donations"
        sx={{
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
        }}
      >
        <HowToVote fontSize="inherit" sx={{ mt: '-2px' }} />
        See our previous donations
      </Link>
    </Typography>
  </CustomPaper>
);
