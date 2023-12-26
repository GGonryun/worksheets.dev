import { NextPageWithLayout } from '@worksheets/util-next';
import { AccountScreen } from '@worksheets/ui/pages/account';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
import { aboutSeo } from '../util/seo';
import { signOut } from 'next-auth/react';

const Page: NextPageWithLayout = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <NextSeo {...aboutSeo} />
      <AccountScreen recent={[]} onLogout={handleLogout} />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
