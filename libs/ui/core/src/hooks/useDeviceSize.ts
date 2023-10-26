import { useMediaQuery, useTheme } from '@mui/material';

export const useDeviceSize = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  return {
    theme,
    isMobile,
    isTablet,
    isDesktop,
  };
};
