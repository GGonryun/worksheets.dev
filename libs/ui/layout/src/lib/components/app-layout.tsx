import React from 'react';

import { LayoutLinks } from '../types';
import { WebsiteFooter } from './footer';
import { Layout } from './layout';
import { AppToolbar } from './toolbar/app-toolbar';

type Props = {
  children: React.ReactNode;
  links?: LayoutLinks;
  notificationButton?: React.ReactNode;
  connectionButton?: React.ReactNode;
};

export const AppLayout: React.FC<Props> = ({
  children,
  connectionButton,
  links,
  notificationButton,
}) => {
  return (
    <Layout
      toolbar={
        <AppToolbar
          rootHref={links?.root}
          notificationButton={notificationButton}
          connectionButton={connectionButton}
        />
      }
      footer={<WebsiteFooter links={links} />}
    >
      {children}
    </Layout>
  );
};
