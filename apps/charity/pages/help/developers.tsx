import { LayoutContainer } from '@worksheets/ui/layout';
import {
  contributionFaq,
  DynamicContributionScreen,
} from '@worksheets/ui/pages/contributions';
import { helpPageJson } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpDevelopersSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpDevelopersSeo} />

      <DynamicContributionScreen />

      <FAQPageJsonLd mainEntity={helpPageJson(contributionFaq)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
