import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';

export const MenuHeader: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Flex px={2} py={1}>
      <Typography
        variant="caption"
        color="text.secondary"
        mb={-0.5}
        fontWeight={900}
      >
        {children}
      </Typography>
    </Flex>
  );
};
