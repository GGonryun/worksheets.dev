'use client';

import React from 'react';

import { WebsiteFooter } from './footer';
import { Layout } from './layout';
import { AppToolbar } from './toolbar/app-toolbar';

type Props = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout
      wallpaper={'coins'}
      toolbar={<AppToolbar />}
      footer={<WebsiteFooter />}
    >
      {children}
    </Layout>
  );
};
