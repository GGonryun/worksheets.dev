import {
  Paper,
  Button,
  Typography,
  ButtonProps,
  TypographyProps,
  BoxProps,
} from '@mui/material';
import { FC, ReactNode } from 'react';

export const MenuButton: FC<{
  onClick?: ButtonProps['onClick'];
  href?: ButtonProps['href'];
  children: ReactNode;
  variant?: TypographyProps['variant'];
  endIcon?: ButtonProps['endIcon'];
  startIcon?: ButtonProps['endIcon'];
  disabled?: boolean;
  color?: TypographyProps['color'];
  boxShadow?: string;
  border?: BoxProps['border'];
  fullWidth?: ButtonProps['fullWidth'];
}> = ({
  onClick,
  children,
  href,
  startIcon,
  endIcon,
  variant,
  disabled,
  color,
  boxShadow,
  border,
  fullWidth,
}) => {
  return (
    <Paper elevation={6}>
      <Button
        href={href}
        fullWidth={fullWidth}
        disableRipple
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={disabled}
        sx={{
          boxShadow,
          border,
        }}
      >
        <Typography
          variant={variant ?? 'body1'}
          fontWeight={900}
          color={color ?? 'primary'}
        >
          {children}
        </Typography>
      </Button>
    </Paper>
  );
};
