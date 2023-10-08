import { Theme, lighten } from '@mui/material';

export const boxShadow = () =>
  'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px';

export const denseBoxShadow = (opt?: { height?: number; power?: number }) => {
  const power = opt?.power ?? 0.8;
  const height = opt?.height ?? 4;
  return `rgba(0, 0, 0, ${power}) ${height * 0.75}px ${height * 0.75}px ${
    opt?.height ?? 4
  }px`;
};

export const textShadow = (height = 1.5, power = 0.5) =>
  `rgba(0, 0, 0, ${power}) ${height * 0.75}px ${height * 0.75}px ${height}px`;

export const responsiveFontSize = (opt?: {
  min?: number;
  max?: number;
  grow?: number;
}) => `clamp(${opt?.min ?? 12}px, ${opt?.grow ?? 4}vmin, ${opt?.max ?? 40}px)`;

export const colors = {
  yellow: {
    dark: '#F2C618',
    main: '#F5D451',
    light: '#FBECB2',
  },
};

export const backgroundColor = (theme: Theme) => {
  return lighten(theme.palette.primary.main, 0.25);
};

export const borderRadius = (theme: Theme) => theme.spacing(3);
