import { Close, Star } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { IconButton } from '../IconButton';

export const Header: FC<{ tokens: number; onClose: () => void }> = ({
  tokens,
  onClose,
}) => {
  return (
    <Flex fullWidth column>
      <Flex spaceBetween>
        <Flex gap={2} alignItems="baseline">
          <Typography fontSize={24}>
            <strong>Tokens Earned:</strong>
          </Typography>
          <Flex gap={0.5}>
            <Typography fontSize={20}>{tokens}</Typography>
            <Star color="warning" />
          </Flex>
        </Flex>
        <IconButton onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      </Flex>
      <Typography fontSize={16} color="text.secondary">
        Spend your tokens to unlock power-ups!
      </Typography>
    </Flex>
  );
};
