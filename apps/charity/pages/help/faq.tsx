import { helpFaq } from '@worksheets/ui/components/qa-section';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { helpPageJson, HelpScreen } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpFaqSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpFaqSeo} />
      <HelpScreen
        title={'Frequently Asked Questions'}
        description={
          'Get the answers to the most common questions about Charity Games.'
        }
        qa={helpFaq}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpFaq)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
