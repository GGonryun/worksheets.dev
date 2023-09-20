import { Typography } from '@mui/material';
import { TinyButton } from '@worksheets/ui-basic-style';
import { uppercase } from '@worksheets/util/strings';
import { FC } from 'react';

export const StartGame: FC<{ onClick: () => void }> = ({ onClick }) => (
  <TinyButton fullWidth color="success" variant="contained" onClick={onClick}>
    <Typography variant="h6">
      <strong>{uppercase('Start Game')}</strong>
    </Typography>
  </TinyButton>
);
