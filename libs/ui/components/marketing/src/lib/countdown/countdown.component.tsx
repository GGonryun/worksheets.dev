import { Box, Link, Typography } from '@mui/material';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { useInterval } from '@worksheets/ui-core';
import { millisecondsAsDuration, timeUntil } from '@worksheets/util/time';
import pluralize from 'pluralize';
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
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: { xs: 400, sm: 500, md: 600 },
        borderRadius: (theme) => theme.shape.borderRadius,
        py: { xs: 1, sm: 1.25, md: 1.5 },
        px: { xs: 1, sm: 2, md: 3 },
        background:
          'linear-gradient(180deg, rgba(2,64,161,1) 0%, rgba(32,159,229,1) 100%)',
        // white box shadow
        boxShadow: '0px 5px 3px rgba(255, 255, 255, 1)',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      <TimeSection label={isMobile ? 'Mo' : 'Month'} value={0} />
      <TimeSection label={isMobile ? 'Day' : 'Day'} value={duration.days} />
      <TimeSection label={isMobile ? 'Hr' : 'Hour'} value={duration.hours} />
      <TimeSection
        label={isMobile ? 'Min' : 'Minute'}
        value={duration.minutes}
      />
      <TimeSection
        label={isMobile ? 'Sec' : 'Second'}
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
        typography={{ xs: 'body2', sm: 'body1', md: 'h6' }}
        fontWeight={{ xs: 500, sm: 500, md: 500 }}
      >
        {pluralize(label, value)}
      </Typography>
      <Typography
        color="text.white"
        typography={{ xs: 'h6', sm: 'h5', md: 'h4' }}
        fontWeight={{ xs: 600, sm: 600, md: 600 }}
      >
        {value.toString().padStart(2, '0')}
      </Typography>
    </Box>
  );
};
