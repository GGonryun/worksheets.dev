import { useTheme } from '@mui/material';
import {
  MobileLayout,
  MobileLayoutProps,
  backgroundColor,
} from '@worksheets/ui-games';
import { FC } from 'react';
import { assets } from '../util/assets';

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
      backgroundColor={backgroundColor(theme)}
      backgroundImage={`url("${assets.background}")`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center center"
      {...props}
    />
  );
};
