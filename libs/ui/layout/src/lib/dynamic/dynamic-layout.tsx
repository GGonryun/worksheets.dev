import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { FC, ReactNode } from 'react';

import { Layout } from '../components';
import { LayoutLinks } from '../types';

const LayoutContainer: FC<{ children: ReactNode; links?: LayoutLinks }> = ({
  children,
  links,
}) => {
  const { data: session } = useSession();

  return (
    <Layout connected={Boolean(session?.user.id)} links={links}>
      {children}
    </Layout>
  );
};

export const DynamicLayout = dynamic(() => Promise.resolve(LayoutContainer), {
  ssr: false,
});
