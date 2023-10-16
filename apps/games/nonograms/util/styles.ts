import { SvgIconProps, Theme, lighten } from '@mui/material';
import {
  dokaBoxShadow,
  megaBoxShadow,
  tabletBoxShadow,
} from '@worksheets/ui-games';

export const boxShadow = `${tabletBoxShadow}, ${dokaBoxShadow}, ${megaBoxShadow}`;

export const highlightColor = (theme: Theme) =>
  lighten(theme.palette.success.light, 0.5);

export const completionColor = (theme: Theme) =>
  lighten(theme.palette.primary.main, 0.5);

export const spinAnimation = (duration: number) => ({
  initial: {
    opacity: 0,
    scale: 0,
    rotate: 720,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
  },
  transition: {
    duration,
  },
});

export const flyDownAnimation = (delay: number) => ({
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 1,
    delay,
  },
});

export const flyUpAnimation = (delay: number) => ({
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 1,
    delay,
  },
});

export const growAnimation = (delay: number) => ({
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 1,
    delay,
  },
});

export const iconProps = (theme: Theme): SvgIconProps => ({
  sx: {
    color: theme.palette.primary.contrastText,
  },
  fontSize: 'large',
});
