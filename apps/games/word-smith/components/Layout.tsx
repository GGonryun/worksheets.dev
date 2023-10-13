import { useTheme } from '@mui/material';
import {
  MobileLayout,
  MobileLayoutProps,
  backgroundColor,
} from '@worksheets/ui-games';
import { FC } from 'react';

export const Layout: FC<Omit<MobileLayoutProps, 'backgroundColor'>> = (
  props
) => {
  const theme = useTheme();
  return <MobileLayout backgroundColor={backgroundColor(theme)} {...props} />;
};
