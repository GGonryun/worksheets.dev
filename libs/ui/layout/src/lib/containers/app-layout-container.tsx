import { useSession } from 'next-auth/react';
import { FC, ReactNode } from 'react';

import { AppLayout } from '../components/app-layout';
import { DynamicConnectionButton } from '../dynamic/dynamic-connection-button';
import { DynamicNotificationButton } from '../dynamic/dynamic-notification-button';

export const AppLayoutContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const session = useSession();
  const connected = session.status === 'authenticated';

  return (
    <AppLayout
      connectionButton={
        session.status !== 'loading' ? (
          <DynamicConnectionButton connected={connected} />
        ) : null
      }
      notificationButton={
        session.status !== 'loading' ? (
          <DynamicNotificationButton connected={connected} />
        ) : null
      }
    >
      {children}
    </AppLayout>
  );
};
