import { useTheme } from '@mui/material';
import {
  MobileLayout,
  MobileLayoutProps,
  backgroundColor,
} from '@worksheets/ui-games';
import { FC } from 'react';
import { assets } from './assets';

export const Layout: FC<
  Omit<
    MobileLayoutProps,
    | 'backgroundColor'
    | 'backgroundImage'
    | 'backgroundSize'
    | 'backgroundRepeat'
    | 'backgroundPosition'
  >
> = (props) => {
  const theme = useTheme();
  return (
    <MobileLayout
      height="100%"
      width="100%"
      backgroundColor={backgroundColor(theme)}
      backgroundImage={`url("${assets.background}")`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center center"
      {...props}
    />
  );
};
