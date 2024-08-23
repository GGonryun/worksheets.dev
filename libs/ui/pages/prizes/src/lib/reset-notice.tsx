import { Alarm } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import { PRIZE_WALL_INTERVAL } from '@worksheets/util/settings';
import React from 'react';

import { useNextPrizeWallInterval } from './hooks/use-time-to-interval';

export const ResetNotice: React.FC = () => {
  const timeRemaining = useNextPrizeWallInterval();

  return (
    <Row gap={1.5}>
      <Alarm fontSize="large" />
      <Column>
        <Typography typography="body1" fontWeight={700}>
          New Deals Every {PRIZE_WALL_INTERVAL} Hours!
        </Typography>
        <Typography typography="body3" fontWeight={500}>
          Next Update: {timeRemaining.string}
        </Typography>
        <Typography typography="body3" fontWeight={500}>
          @ {timeRemaining.utc}
        </Typography>
      </Column>
    </Row>
  );
};
