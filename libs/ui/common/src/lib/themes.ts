import { Theme, lighten } from '@mui/material';

export type PaddingStyles = {
  p?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  px?: number;
  py?: number;
};
export type BackgroundColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'grey'
  | 'white';

export const selectBackground = (theme: Theme, color: BackgroundColors) => {
  switch (color) {
    case 'primary':
      return lighten(theme.palette.primary.light, 0.9);
    case 'secondary':
      return lighten(theme.palette.secondary.light, 0.9);
    case 'success':
      return lighten(theme.palette.success.light, 0.9);
    case 'info':
      return lighten(theme.palette.info.light, 0.9);
    case 'warning':
      return lighten(theme.palette.warning.light, 0.9);
    case 'error':
      return lighten(theme.palette.error.light, 0.9);
    case 'grey':
      return theme.palette.grey[100];
    case 'white':
      return theme.palette.common.white;
  }
};

export const selectBorder = (theme: Theme, color: BackgroundColors) => {
  switch (color) {
    case 'primary':
      return theme.palette.primary.main;
    case 'secondary':
      return theme.palette.secondary.main;
    case 'success':
      return theme.palette.success.main;
    case 'info':
      return theme.palette.info.main;
    case 'warning':
      return theme.palette.warning.main;
    case 'error':
      return theme.palette.error.main;
    case 'grey':
      return theme.palette.grey[300];
    case 'white':
      return theme.palette.common.white;
  }
};
