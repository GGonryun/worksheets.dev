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
      Every game you play on this site will generate a small amount of revenue
      that will be donated to charity. You get to choose which cause we support
      next!
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
        Vote for the next campaign!
      </Link>
    </Typography>
  </CustomPaper>
);
