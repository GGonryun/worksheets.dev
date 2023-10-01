import { Flex } from '@worksheets/ui-core';
import { FC, ReactNode } from 'react';
import { emojiBackground } from '../Background';

export const GameLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex p={2} centered sx={emojiBackground} className={'game'}>
      <Flex
        fill
        column
        maxWidth={400}
        maxHeight={700}
        sx={{
          border: '2px solid black',
          borderRadius: 5,
          backgroundColor: 'background.paper',
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
};
