import { PlayArrow } from '@mui/icons-material';
import { Typography, useTheme } from '@mui/material';
import { MenuButton } from '@worksheets/ui-games';
import { uppercase } from '@worksheets/util/strings';
import { FC } from 'react';

export const StartGame: FC<{ onClick: () => void }> = ({ onClick }) => {
  const theme = useTheme();
  return (
    <MenuButton
      endIcon={<PlayArrow color="primary" />}
      fullWidth
      variant="h6"
      color="success"
      onClick={onClick}
      border={`3px solid ${theme.palette.primary.main}`}
    >
      <strong>{uppercase('Start Game')}</strong>
    </MenuButton>
  );
};
