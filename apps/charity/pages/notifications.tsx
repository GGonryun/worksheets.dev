import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicNotificationsScreen } from '@worksheets/ui/pages/notifications';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo title="Charity Games - Notifications" noindex />
    <DynamicNotificationsScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
