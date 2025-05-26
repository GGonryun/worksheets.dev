import { FC, ReactNode } from 'react';

import { AppLayout } from '../components/app-layout';
import { useDrawerData } from '../hook/use-drawer-data';

export const AppLayoutContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { connected } = useDrawerData();

  return <AppLayout connected={connected}>{children}</AppLayout>;
};
