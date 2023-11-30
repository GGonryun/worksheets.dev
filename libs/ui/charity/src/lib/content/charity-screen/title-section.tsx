import { Typography, Link } from '@mui/material';
import { FC } from 'react';
import { CustomPaper } from './custom-paper';
import { HowToVote } from '@mui/icons-material';

export const TitleSection: FC<{ pollUrl: string }> = ({ pollUrl }) => (
  <CustomPaper>
    <Typography variant="h3" sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}>
      Play With Purpose
    </Typography>
    <Typography>
      Every game you play generates a small amount of revenue that will be
      donated to charity. You have the power to decide where the money goes!
    </Typography>
    <Typography variant="body3" sx={{ mt: 1 }}>
      <Link
        href={pollUrl}
        sx={{
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
        }}
      >
        <HowToVote fontSize="inherit" sx={{ mt: '-2px' }} />
        Vote for the next charity!
      </Link>
    </Typography>
  </CustomPaper>
);
