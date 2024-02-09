import {
  Breakpoint,
  Theme,
  useMediaQuery as useMediaQueryOriginal,
} from '@mui/material';

export const useMediaQuery = (opt: (theme: Theme) => string) => {
  return useMediaQueryOriginal(opt);
};

export const useMediaQueryDown = (size: Breakpoint) => {
  return useMediaQuery((theme) => theme.breakpoints.down(size));
};

export const useMediaQueryUp = (size: Breakpoint) => {
  return useMediaQuery((theme) => theme.breakpoints.up(size));
};
