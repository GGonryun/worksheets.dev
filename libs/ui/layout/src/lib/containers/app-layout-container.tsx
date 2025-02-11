'use client';

import {
  AccountCircle,
  HourglassEmpty,
  Login,
  Menu,
} from '@mui/icons-material';
import { routes } from '@worksheets/routes';
import { FC, ReactNode } from 'react';

import { AppLayout } from '../components/app-layout';
import { SquareButton } from '../components/shared/square-button';
import { useDrawerData } from '../hook/use-drawer-data';

export const AppLayoutContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { connected, loading, notifications } = useDrawerData();

  if (loading) return <AppLayout children={children} />;

  return (
    <AppLayout
      drawerButton={
        <SquareButton onClick={() => console.log('menu')} color={'primary'}>
          <Menu fontSize="small" />
        </SquareButton>
      }
      connectionButton={
        <SquareButton
          href={connected ? undefined : routes.login.path()}
          onClick={connected ? () => console.log('account') : undefined}
          color={
            connected && notifications.data && notifications.data > 0
              ? 'error'
              : 'primary'
          }
        >
          {connected ? (
            <AccountCircle fontSize="small" />
          ) : loading ? (
            <HourglassEmpty fontSize="small" />
          ) : (
            <Login fontSize="small" />
          )}
        </SquareButton>
      }
    >
      {children}
    </AppLayout>
  );
};
