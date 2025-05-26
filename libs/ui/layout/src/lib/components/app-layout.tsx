import React from 'react';

import { WebsiteFooter } from './footer';
import { Layout } from './layout';
import { AppToolbar } from './toolbar/app-toolbar';

type Props = {
  children: React.ReactNode;
  connected: boolean;
};

export const AppLayout: React.FC<Props> = ({ children, connected }) => {
  return (
    <Layout
      wallpaper={'coins'}
      toolbar={<AppToolbar connected={connected} />}
      footer={<WebsiteFooter />}
    >
      {children}
    </Layout>
  );
};
