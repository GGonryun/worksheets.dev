import { useMediaQuery, useTheme } from '@mui/material';
import { useScrollPosition } from './useScrollPosition';

export const useLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const isThicc = useMediaQuery(theme.breakpoints.up('xl'));
  const scroll = useScrollPosition();
  return {
    theme,
    isMobile,
    isTablet,
    isLarge,
    isThicc,
    scroll,
  };
};
