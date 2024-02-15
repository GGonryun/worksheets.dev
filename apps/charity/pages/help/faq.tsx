import { LayoutContainer } from '@worksheets/ui/layout';
import { helpFaq, helpPageJson, HelpScreen } from '@worksheets/ui/pages/help';
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
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
