import { PaletteColor, Theme } from '@mui/material';

export function selectPaletteColor(
  theme: Theme,
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
): PaletteColor {
  switch (color) {
    case 'primary':
      return theme.palette.primary;
    case 'secondary':
      return theme.palette.secondary;
    case 'error':
      return theme.palette.error;
    case 'warning':
      return theme.palette.warning;
    case 'info':
      return theme.palette.info;
    case 'success':
      return theme.palette.success;
    case 'inherit':
    case 'default':
      return {
        light: theme.palette.grey[500],
        main: theme.palette.grey[700],
        dark: theme.palette.grey[900],
        contrastText: theme.palette.common.white,
      };
    default:
      return theme.palette.primary;
  }
}
