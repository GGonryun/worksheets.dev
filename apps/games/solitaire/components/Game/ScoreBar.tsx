import { Box } from '@mui/material';
import { FC } from 'react';

export type ScoreBarProps = {
  height: number;
};
export const ScoreBar: FC<ScoreBarProps> = ({ height }) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'success.dark',
        height,
      }}
    />
  );
};
