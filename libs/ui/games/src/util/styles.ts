import { Theme, lighten } from '@mui/material';

export const boxShadow = () =>
  'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px';

export const denseBoxShadow = () => 'rgba(0, 0, 0, 0.8) 3px 3px 4px';

export const textShadow = (height = 1.5, power = 0.5) =>
  `rgba(0, 0, 0, ${power}) ${height * 0.75}px ${height * 0.75}px ${height}px`;

export const responsiveFontSize = (min: number, size: number) =>
  `clamp(${min}px, ${size}vmin, 48px)`;

export const colors = {
  yellow: {
    dark: '#F2C618',
    main: '#F5D451',
    light: '#FBECB2',
  },
};

export const backgroundColor = (theme: Theme) =>
  lighten(theme.palette.primary.main, 0.25);

export const borderRadius = (theme: Theme) => theme.spacing(3);
