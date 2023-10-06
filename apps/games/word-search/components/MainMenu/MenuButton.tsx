import { Paper, Button, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { backgroundColor } from '../../util';

export const MenuButton: FC<{ onClick: () => void; children: ReactNode }> = ({
  onClick,
  children,
}) => {
  return (
    <Paper elevation={6}>
      <Button disableRipple onClick={onClick}>
        <Typography fontWeight={900} color={backgroundColor}>
          {children}
        </Typography>
      </Button>
    </Paper>
  );
};
