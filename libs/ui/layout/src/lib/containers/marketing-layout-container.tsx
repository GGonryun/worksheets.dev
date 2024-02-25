import { FC, ReactNode } from 'react';

import { MarketingLayout } from '../components/marketing-layout';

export const MarketingLayoutContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <MarketingLayout>{children}</MarketingLayout>;
};
