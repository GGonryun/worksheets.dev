import { Box } from '@mui/material';
import { Circle, Flex } from '@worksheets/ui-core';
import { FC } from 'react';

export const BoardPoints: FC<{
  top?: boolean;
  bot?: boolean;
  left?: boolean;
  right?: boolean;
}> = ({ top, bot, left, right }) => {
  return (
    <>
      {top && (
        <Box position="absolute" top={-22} left={0} right={0}>
          <VerticalRow />
        </Box>
      )}
      {bot && (
        <Box position="absolute" bottom={-22} left={0} right={0}>
          <VerticalRow />
        </Box>
      )}
      {left && (
        <Box position="absolute" top={0} bottom={0} left={-22}>
          <HorizontalRow />
        </Box>
      )}
      {right && (
        <Box position="absolute" top={0} bottom={0} right={-22}>
          <HorizontalRow />
        </Box>
      )}
    </>
  );
};

const VerticalRow: FC = () => (
  <Flex fill justifyContent="space-around">
    <Circle color="red" />
    <Circle color="orange" />
    <Circle color="yellow" />
  </Flex>
);

const HorizontalRow: FC = () => (
  <Flex fill column justifyContent="space-around">
    <Circle color="green" />
    <Circle color="blue" />
    <Circle color="purple" />
  </Flex>
);
