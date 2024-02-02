import { Casino } from '@mui/icons-material';
import { Box, Link, Paper, Typography } from '@mui/material';
import { useInterval } from '@worksheets/ui-core';
import { millisecondsAsDuration } from '@worksheets/util/time';
import { useState } from 'react';

export const RaffleCountdown: React.FC<{ expires: number }> = ({ expires }) => {
  const [timeLeft, setTimeLeft] = useState<number>(expires - Date.now());
  useInterval(() => {
    setTimeLeft(expires - Date.now());
  }, 1000);

  const units = millisecondsAsDuration(timeLeft);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Paper
        sx={{
          width: 'fit-content',
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: (theme) => theme.palette.text.arcade,
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography>Next raffle ends in</Typography>
        <Box display="flex" gap={{ xs: 1, sm: 2 }} mb={2}>
          <DurationBox unit="days" value={units.days} />
          <ColonSpacer />
          <DurationBox unit="hours" value={units.hours} />
          <ColonSpacer />
          <DurationBox unit="minutes" value={units.minutes} />
          <ColonSpacer />
          <DurationBox unit="seconds" value={units.seconds} />
        </Box>
        <Typography
          component={Link}
          href="/prizes"
          color="inherit"
          underline="always"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecorationColor: 'inherit',
          }}
        >
          <Casino />
          Try your luck!
        </Typography>
      </Paper>
    </Box>
  );
};

const ColonSpacer = () => (
  <Typography
    typography={{
      xs: 'h4',
      sm: 'h3',
      md: 'h2',
    }}
  >
    :
  </Typography>
);

const DurationBox: React.FC<{ unit: string; value: number }> = ({
  unit,
  value,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Typography
      typography={{
        xs: 'h4',
        sm: 'h3',
        md: 'h2',
      }}
    >
      {pad(value)}
    </Typography>
    <Typography variant="body3">{unit}</Typography>
  </Box>
);

const pad = (n: number) => n.toString().padStart(2, '0');
