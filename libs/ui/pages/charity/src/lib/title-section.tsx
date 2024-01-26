import { HowToVote } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { FC } from 'react';

import { CustomPaper } from './custom-paper';

export const TitleSection: FC = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <CustomPaper>
      <Typography
        variant={isMobile ? 'h5' : 'h3'}
        color="text.arcade"
        sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}
      >
        Play With Purpose
      </Typography>
      <Typography variant={isMobile ? 'body2' : 'body1'} color="text.arcade">
        Every game you play generates a small amount of revenue that will be
        donated to charity. Every week we will donate the total amount of
        revenue generated to a charity of your choice.
      </Typography>
      <Link
        color="text.arcade"
        variant="body3"
        href="/donations"
        sx={{
          mt: 1,
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
        }}
      >
        <HowToVote fontSize="inherit" sx={{ mt: '-2px' }} />
        See our previous donations
      </Link>
    </CustomPaper>
  );
};
