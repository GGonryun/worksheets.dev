import { AppLayoutContainer } from '@worksheets/ui/layout';
import { HelpCenterScreen } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { helpCenterSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpCenterSeo} />
      <HelpCenterScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
