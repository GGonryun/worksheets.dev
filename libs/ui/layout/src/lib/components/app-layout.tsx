import React from 'react';

import { WebsiteFooter } from './footer';
import { Layout } from './layout';
import { AppToolbar } from './toolbar/app-toolbar';

type Props = {
  children: React.ReactNode;
  connectionButton?: React.ReactNode;
  drawerButton?: React.ReactNode;
};

export const AppLayout: React.FC<Props> = ({
  children,
  connectionButton,
  drawerButton,
}) => {
  return (
    <Layout
      wallpaper={'coins'}
      toolbar={
        <AppToolbar
          connectionButton={connectionButton}
          drawerButton={drawerButton}
        />
      }
      footer={<WebsiteFooter />}
    >
      {children}
    </Layout>
  );
};
