import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminUsersScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo noindex title="Admin - Users" />
    <DynamicAdminUsersScreen />
  </>
);

export const getServerSideProps = adminMiddleware(async () => {
  return {
    props: {},
  };
});

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
