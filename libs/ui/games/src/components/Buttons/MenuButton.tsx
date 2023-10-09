import {
  Paper,
  Button,
  Typography,
  ButtonProps,
  TypographyProps,
} from '@mui/material';
import { FC, ReactNode } from 'react';

export const MenuButton: FC<{
  onClick: () => void;
  children: ReactNode;
  endIcon?: ButtonProps['endIcon'];
  disabled?: boolean;
  color?: TypographyProps['color'];
}> = ({ onClick, children, endIcon, disabled, color }) => {
  return (
    <Paper elevation={6}>
      <Button
        disableRipple
        onClick={onClick}
        endIcon={endIcon}
        disabled={disabled}
      >
        <Typography fontWeight={900} color={color ?? 'primary'}>
          {children}
        </Typography>
      </Button>
    </Paper>
  );
};
