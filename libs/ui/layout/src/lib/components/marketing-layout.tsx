import React from 'react';

import { Layout } from './layout';
import { MarketingToolbar } from './toolbar/marketing-toolbar';

type Props = {
  children: React.ReactNode;
};

export const MarketingLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout pt={0} pb={0} disableBackground toolbar={<MarketingToolbar />}>
      {children}
    </Layout>
  );
};
