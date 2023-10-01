import { Flex } from '@worksheets/ui-core';
import { border } from '../layouts';
import { FC } from 'react';

export const TextButton: FC<{
  onClick: () => void;
  children: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, endIcon, disabled }) => (
  <Flex
    sx={(theme) => ({
      border: border(theme),
      backgroundColor: theme.palette.grey[300],
      borderRadius: 5,
      px: 2,
      ...(disabled
        ? {
            opacity: 0.5,
            cursor: 'not-allowed',
          }
        : {
            cursor: 'pointer',
            ':hover': {
              backgroundColor: theme.palette.grey[400],
            },
            ':active': {
              backgroundColor: theme.palette.grey[500],
            },
          }),
    })}
    onClick={!disabled ? onClick : undefined}
  >
    <Flex sx={{ fontSize: 14, gap: 0.5, color: 'text.secondary' }}>
      {children}
      {endIcon}
    </Flex>
  </Flex>
);
