import { Theme, useMediaQuery as useMediaQueryOriginal } from '@mui/material';

export const useMediaQuery = (opt: (theme: Theme) => string) => {
  return useMediaQueryOriginal(opt);
};
