import { Box, Link, Typography } from '@mui/material';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { useInterval } from '@worksheets/ui-core';
import { millisecondsAsDuration, timeUntil } from '@worksheets/util/time';
import React, { useState } from 'react';

export const Countdown: React.FC<{ expiresAt: number; href?: string }> = ({
  expiresAt,
  href,
}) => {
  const isMobile = useMediaQueryDown('sm');
  const [timeRemaining, setTimeRemaining] = useState<number>(
    timeUntil(expiresAt)
  );

  useInterval(() => {
    setTimeRemaining(timeUntil(expiresAt));
  }, 1000);

  const duration = millisecondsAsDuration(timeRemaining);

  return (
    <Box
      component={Link}
      href={href}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        maxWidth: { xs: 400, sm: 500, md: 600 },
        borderRadius: 8,
        p: { xs: 2, sm: 2.5, md: 3 },
        background:
          'linear-gradient(180deg, rgba(2,64,161,1) 0%, rgba(32,159,229,1) 100%)',
        // white box shadow
        boxShadow: '0px 5px 3px rgba(255, 255, 255, 0.25)',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      <TimeSection label={isMobile ? 'Mo' : 'Months'} value={0} />
      <TimeSection label={isMobile ? 'Day' : 'Days'} value={duration.days} />
      <TimeSection label={isMobile ? 'Hr' : 'Hours'} value={duration.hours} />
      <TimeSection
        label={isMobile ? 'Min' : 'Minutes'}
        value={duration.minutes}
      />
      <TimeSection
        label={isMobile ? 'Sec' : 'Seconds'}
        value={duration.seconds}
      />
    </Box>
  );
};

const TimeSection: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ userSelect: 'none' }}
    >
      <Typography
        color="text.blue.soft"
        typography={{ xs: 'body1', sm: 'h6', md: 'h5' }}
        fontWeight={{ xs: 500, sm: 500, md: 500 }}
      >
        {label}
      </Typography>
      <Typography
        color="text.white"
        typography={{ xs: 'h5', sm: 'h4', md: 'h3' }}
        fontWeight={{ xs: 600, sm: 600, md: 600 }}
      >
        {value.toString().padStart(2, '0')}
      </Typography>
    </Box>
  );
};
