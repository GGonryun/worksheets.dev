import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';

export const FightBanner: FC<{ emojis: string[] }> = ({ emojis }) => {
  return (
    <Flex gap={0.5}>
      <Typography>
        {emojis[0] ?? ''} vs {emojis[1] ?? ''}
      </Typography>
    </Flex>
  );
};
