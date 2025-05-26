import { alpha, Palette, SxProps, Theme } from '@mui/material';

export type ButtonBoxShadowColor = Extract<
  keyof Palette,
  'primary' | 'warning' | 'success' | 'error' | 'secondary'
>;

export const buttonBoxShadow = (
  color: ButtonBoxShadowColor
): SxProps<Theme> => ({
  '&:active:before': {
    boxShadow: 0,
  },
  '&::before': {
    content: '""',
    transition: (theme) => theme.transitions.create('box-shadow'),
    boxShadow: (theme) =>
      `${alpha(theme.palette[color].shadow, 0.6)} 0px 2px 4px, ${alpha(
        theme.palette[color].shadow,
        0.8
      )} 0px 5px 11px -3px`,
    position: 'absolute',
    borderRadius: 2.5,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
