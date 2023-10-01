import { Close, Forest } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { IconButton } from '../IconButton';
import { Discovered } from '../../types';

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
          <Typography fontSize={16}>
            ({discovered}/{total})
            <Forest
              color="success"
              sx={{
                ml: 0.5,
                mb: 0.5,
              }}
            />
          </Typography>
        </Flex>
        <IconButton onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      </Flex>
      <Typography fontSize={14} color={'text.secondary'}>
        <b>Discover bonus words to earn extra points.</b>
      </Typography>
    </Flex>
  );
};
