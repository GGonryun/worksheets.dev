import { useSession } from 'next-auth/react';
import { FC, ReactNode } from 'react';

import { Layout } from '../components';
import { DynamicConnectionButton } from '../dynamic/dynamic-connection-button';
import { DynamicNotificationButton } from '../dynamic/dynamic-notification-button';
import { LayoutLinks } from '../types';

export const LayoutContainer: FC<{
  children: ReactNode;
  links?: LayoutLinks;
}> = ({ children, links }) => {
  const session = useSession();
  const connected = session.status === 'authenticated';

  return (
    <Layout
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
      links={links}
    >
      {children}
    </Layout>
  );
};
