import {
  AccountCircle,
  HourglassEmpty,
  Login,
  Menu,
} from '@mui/icons-material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useSession } from 'next-auth/react';
import { FC, ReactNode, useState } from 'react';

import { AccountDrawer, AppDrawer } from '../components';
import { AppLayout } from '../components/app-layout';
import { SquareButton } from '../components/shared/square-button';

export const AppLayoutContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const session = useSession();
  const connected = session.status === 'authenticated';
  const loading = session.status === 'loading';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const user = trpc.user.get.useQuery(undefined, {
    enabled: connected,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const tokens = trpc.user.inventory.quantity.useQuery('1', {
    enabled: connected,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const notifications = trpc.user.notifications.count.useQuery(
    { unread: true },
    {
      enabled: connected,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <AppLayout
        drawerButton={
          <SquareButton onClick={() => setDrawerOpen(true)} color={'primary'}>
            <Menu fontSize="small" />
          </SquareButton>
        }
        connectionButton={
          <SquareButton
            href={connected ? undefined : routes.login.path()}
            onClick={connected ? () => setAccountOpen(true) : undefined}
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
      <AppDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        connected={connected}
      />
      <AccountDrawer
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        user={user.data}
        tokens={tokens.data}
        notifications={notifications.data}
      />
    </>
  );
};
