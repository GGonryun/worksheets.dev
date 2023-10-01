import { FC } from 'react';

import { Box } from '@mui/material';
import { Flex } from '@worksheets/ui-core';

export const BonusWordsPill: FC<{ count: number }> = ({ count }) => {
  return (
    <Box
      sx={(theme) => ({
        position: 'absolute',
        top: -8,
        right: -8,
        height: 22,
        minWidth: 22,
        borderRadius: '50%',
        border: `2px solid ${theme.palette.grey[700]}`,
        backgroundColor: theme.palette.background.paper,
        fontSize: 14,
      })}
    >
      <Flex fill centered>
        {count}
      </Flex>
    </Box>
  );
};
