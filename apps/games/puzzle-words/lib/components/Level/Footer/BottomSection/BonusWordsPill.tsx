import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';

export const BonusWordsPill: FC<{ count: number }> = ({ count }) => {
  return (
    <Box
      sx={(theme) => ({
        position: 'absolute',
        top: -4,
        right: -4,
        height: 26,
        minWidth: 26,
        borderRadius: '50%',
        border: `3px solid ${theme.palette.primary.light}`,
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Flex fill centered>
        <Typography>{count}</Typography>
      </Flex>
    </Box>
  );
};
