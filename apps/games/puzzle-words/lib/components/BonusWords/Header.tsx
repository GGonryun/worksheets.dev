import { Close, Forest } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Discovered } from '../../types';
import { IconAction } from '@worksheets/ui-games';

export const Header: FC<{ words: Discovered; onClose: () => void }> = ({
  words,
  onClose,
}) => {
  const discovered = Object.values(words).filter((x) => x).length;
  const total = Object.keys(words).length;
  return (
    <Flex fullWidth column>
      <Flex spaceBetween>
        <Flex gap={2} alignItems="baseline">
          <Typography fontSize={24}>
            <strong>Bonus Words</strong>
          </Typography>
          <Flex gap={0.5}>
            <Typography fontSize={16}>
              ({discovered}/{total})
            </Typography>
            <Forest color="success" sx={{ mb: 0.5 }} />
          </Flex>
        </Flex>
        <IconAction dense onClick={onClose} Icon={Close} shadowless />
      </Flex>
      <Typography fontSize={14} color={'text.secondary'}>
        <b>Discover bonus words to earn extra tokens.</b>
      </Typography>
    </Flex>
  );
};
