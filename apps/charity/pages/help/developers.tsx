import { LayoutContainer } from '@worksheets/ui/layout';
import {
  developersPortalFaq,
  DynamicDevelopersPortalScreen,
} from '@worksheets/ui/pages/developers-portal';
import { helpPageJson } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpDevelopersSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpDevelopersSeo} />

      <DynamicDevelopersPortalScreen />

      <FAQPageJsonLd mainEntity={helpPageJson(developersPortalFaq)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
