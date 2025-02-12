import React from 'react';

import { WebsiteFooter } from './footer';
import { Layout } from './layout';
import { AppToolbar, ToolbarProps } from './toolbar/app-toolbar';

type Props = {
  children: React.ReactNode;
} & ToolbarProps;

export const AppLayout: React.FC<Props> = ({ children, ...toolbarProps }) => {
  return (
    <Layout
      wallpaper={'coins'}
      toolbar={<AppToolbar {...toolbarProps} />}
      footer={<WebsiteFooter />}
    >
      {children}
    </Layout>
  );
};
