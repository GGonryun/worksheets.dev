import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { LayoutProps } from './Layout';
import { Box } from '@mui/material';

export const Player: FC<
  Pick<LayoutProps, 'builder' | 'selection' | 'footer'>
> = ({ builder, selection, footer }) => {
  return (
    <Flex pt="54px" position="relative">
      <Flex centered fullWidth top={0} position="absolute">
        {selection}
      </Flex>
      <Flex fullWidth centered position="relative">
        <Box zIndex={1}>{builder}</Box>
        <Flex position="absolute" fill>
          {footer}
        </Flex>
      </Flex>
    </Flex>
  );
};
