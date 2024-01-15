import { Box, Typography } from '@mui/material';
import { WebHourglass } from '@worksheets/icons/web';
import { FC } from 'react';

export const RewardsTimer: FC<{ timeRemaining: string }> = ({
  timeRemaining,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1,
      }}
    >
      <Typography fontStyle="italic" variant="body2" color="text.secondary">
        Rewards refresh every 24 hours.
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <WebHourglass />
        <Typography variant="h6">{timeRemaining}</Typography>
      </Box>
    </Box>
  );
};
