import { Typography } from '@mui/material';
import {
  durationFromSeconds,
  printCountdownDuration,
} from '@worksheets/util/time';
import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Icon } from '../Icon';

export const Timer: FC<{ value: number }> = ({ value }) => {
  return (
    <Flex gap={0.5}>
      <Icon size={16} name="clock" />
      <Typography color={value < 60 ? 'error.main' : 'text.primary'}>
        {printCountdownDuration(durationFromSeconds(value))}
      </Typography>
    </Flex>
  );
};
