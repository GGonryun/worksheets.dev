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
  startIcon?: ButtonProps['endIcon'];
  disabled?: boolean;
  color?: TypographyProps['color'];
  boxShadow?: string;
}> = ({
  onClick,
  children,
  startIcon,
  endIcon,
  disabled,
  color,
  boxShadow,
}) => {
  return (
    <Paper elevation={6}>
      <Button
        disableRipple
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={disabled}
        sx={{
          boxShadow,
        }}
      >
        <Typography fontWeight={900} color={color ?? 'primary'}>
          {children}
        </Typography>
      </Button>
    </Paper>
  );
};
