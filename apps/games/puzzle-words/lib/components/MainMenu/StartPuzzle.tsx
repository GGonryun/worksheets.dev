import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { TextButton } from '../TextButton';
import { useRouter } from 'next/router';
import { urls } from '../../urls';
import { FC } from 'react';

export const StartPuzzle: FC<{ level: number }> = ({ level }) => {
  const { push } = useRouter();

  const handleStartPuzzle = () => {
    push(urls.puzzle());
  };

  return (
    <Flex centered py={2}>
      <TextButton onClick={handleStartPuzzle}>
        <Typography variant="h6">Puzzle #{level + 1}</Typography>
      </TextButton>
    </Flex>
  );
};
