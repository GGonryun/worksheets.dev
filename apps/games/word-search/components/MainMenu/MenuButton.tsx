import { Paper, Button, Typography } from '@mui/material';
import { backgroundColor } from '@worksheets/ui-games';
import { FC, ReactNode } from 'react';

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
