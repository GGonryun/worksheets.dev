import { LayoutContainer } from '@worksheets/ui/layout';
import {
  contributionFaq,
  DynamicContributionScreen,
} from '@worksheets/ui/pages/contributions';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpDevelopersSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpDevelopersSeo} />

      <DynamicContributionScreen />

      <FAQPageJsonLd
        mainEntity={contributionFaq
          .filter((data) => Boolean(data.summary))
          .map((data) => ({
            questionName: data.question,
            acceptedAnswerText: data.summary,
          }))}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
