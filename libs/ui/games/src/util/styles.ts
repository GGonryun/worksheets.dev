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

export const insetBoxShadow = `rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset`;

export const denseInsetBoxShadow = `box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset`;

export const bubbleInsetBoxShadow = `rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px`;

export const tabletBoxShadow = `box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`;
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
