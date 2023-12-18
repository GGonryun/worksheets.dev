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
  target?: '_blank';
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
  target,
}) => {
  // button has a hard time accepting both the onClick and href props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = {
    target,
    startIcon,
    endIcon,
    disabled,
    disableRipple: true,
    border,
    fullWidth,
    sx: {
      boxShadow,
      border,
    },
  };

  if (onClick) props.onClick = onClick;
  if (href) props.href = href;

  return (
    <Paper elevation={6}>
      <Button {...props}>
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
