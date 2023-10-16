import { Flex } from '@worksheets/ui-core';
import { PuzzleItem } from '../../util/types';
import { FC } from 'react';
import { Typography } from '@mui/material';
import { textShadow } from '@worksheets/ui-games';
import { HomeOutlined, Lock } from '@mui/icons-material';
import { BasicButton } from '../BasicButton';
import { urls } from '../../util/urls';

export const PuzzleLockedScreen: FC<{ puzzle: PuzzleItem }> = ({ puzzle }) => {
  return (
    <Flex fill centered column gap={3}>
      <Typography
        variant="h5"
        fontWeight={900}
        textAlign="center"
        color="primary.contrastText"
        sx={{
          textShadow: textShadow(3, 0.5),
        }}
      >
        This puzzle is locked
      </Typography>
      <Lock sx={{ fontSize: 64, color: 'primary.contrastText' }} />
      <Typography
        variant="body2"
        textAlign="center"
        color="primary.contrastText"
        sx={{
          textShadow: textShadow(3, 0.5),
        }}
      >
        Complete {puzzle.requires} levels to unlock this puzzle.
      </Typography>
      <BasicButton
        color="white"
        startIcon={<HomeOutlined />}
        href={urls.home()}
      >
        <Typography variant="h5">Main Menu</Typography>
      </BasicButton>
    </Flex>
  );
};
