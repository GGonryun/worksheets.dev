import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminPrizesScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo noindex title="Admin - Prizes" />
    <DynamicAdminPrizesScreen />
  </>
);

export const getServerSideProps = adminMiddleware(async () => {
  return {
    props: {},
  };
});

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
