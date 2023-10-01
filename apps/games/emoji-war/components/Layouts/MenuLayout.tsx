import { Flex } from '@worksheets/ui-core';
import { FC, ReactNode } from 'react';
import { emojiBackground } from '../Background';

export const MenuLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex fill centered sx={emojiBackground} className="menu">
      <Flex fill centered p={2}>
        <Flex
          centered
          column
          minWidth={300}
          minHeight={500}
          maxWidth={400}
          maxHeight={700}
          p={2}
          sx={{
            border: '2px solid black',
            borderRadius: 5,
            backgroundColor: 'background.paper',
          }}
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
