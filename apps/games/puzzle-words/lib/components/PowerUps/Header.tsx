import { Close, Star } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { IconAction } from '@worksheets/ui-games';

export const Header: FC<{ tokens: number; onClose: () => void }> = ({
  tokens,
  onClose,
}) => {
  return (
    <Flex fullWidth column>
      <Flex spaceBetween>
        <Flex gap={2} alignItems="baseline">
          <Typography fontSize={24}>
            <strong>Points Earned:</strong>
          </Typography>
          <Flex gap={0.5}>
            <Typography fontSize={20}>{tokens}</Typography>
            <Star color="warning" />
          </Flex>
        </Flex>
        <IconAction dense onClick={onClose} Icon={Close} shadowless />
      </Flex>
      <Typography variant="body2" color="text.secondary">
        Unlock power-ups with your points!
      </Typography>
    </Flex>
  );
};
