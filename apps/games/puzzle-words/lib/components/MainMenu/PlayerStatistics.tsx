import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { usePlayer } from '../../hooks';
import { Star, WaterDrop } from '@mui/icons-material';
import { FC } from 'react';

export const PlayerPoints: FC<{ points: number }> = ({ points }) => {
  return (
    <Flex gap={1}>
      <Star sx={{ color: 'warning.main' }} />
      <Typography variant="h6">Current Points: {points}</Typography>
      <Star sx={{ color: 'warning.main' }} />
    </Flex>
  );
};

export const WaterDonated: FC<{ water: number }> = ({ water }) => {
  return (
    <Flex gap={1}>
      <WaterDrop sx={{ color: 'primary.main' }} />
      <Typography variant="h6">Water Donated: {water} ml</Typography>
      <WaterDrop sx={{ color: 'primary.main' }} />
    </Flex>
  );
};
