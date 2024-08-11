import { Alarm } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import React from 'react';

import { useTimeToUtcMidnight } from './hooks/use-time-to-midnight';

export const ResetNotice: React.FC = () => {
  const timeRemaining = useTimeToUtcMidnight();

  return (
    <Row gap={1.5}>
      <Alarm fontSize="large" />
      <Column>
        <Typography typography="body1" fontWeight={700}>
          New Deals Every Day!
        </Typography>
        <Typography typography="body3" fontWeight={500}>
          Next Update: {timeRemaining.string}
        </Typography>
      </Column>
    </Row>
  );
};
