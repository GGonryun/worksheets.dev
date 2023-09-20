import { Flex } from '@worksheets/ui-core';
import { FC, ReactNode } from 'react';

export const MenuLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex sx={{ position: 'relative' }} height="100vh" width="100vw" centered>
      <Flex fill centered column maxWidth={400} px={3}>
        {children}
      </Flex>
    </Flex>
  );
};
