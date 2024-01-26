import { DynamicLayout } from '@worksheets/ui/layout';
import { helpFaq, HelpScreen } from '@worksheets/ui/pages/help';
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
      <FAQPageJsonLd
        mainEntity={helpFaq
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
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
