import { Paper, Button, Typography, ButtonProps } from '@mui/material';
import { FC, ReactNode } from 'react';
import { backgroundColor } from '../../util';

export const MenuButton: FC<{
  onClick: () => void;
  children: ReactNode;
  endIcon?: ButtonProps['endIcon'];
  disabled?: boolean;
}> = ({ onClick, children, endIcon, disabled }) => {
  return (
    <Paper elevation={6}>
      <Button
        disableRipple
        onClick={onClick}
        endIcon={endIcon}
        disabled={disabled}
      >
        <Typography fontWeight={900} color={backgroundColor}>
          {children}
        </Typography>
      </Button>
    </Paper>
  );
};
