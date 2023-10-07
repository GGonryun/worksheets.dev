import { Theme, lighten } from '@mui/material';

export const backgroundColor = (theme: Theme) =>
  lighten(theme.palette.secondary.main, 0.25);

export const borderRadius = (theme: Theme) => theme.spacing(3);

export const boxShadow = () =>
  'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px';
