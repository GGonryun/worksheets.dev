import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQScreen } from '@worksheets/ui/pages/faq';
import { LayoutContainer } from '../containers/layout-container';
import { faq } from '@worksheets/data-access/charity-games';
import { FAQPageJsonLd, NextSeo } from 'next-seo';
import { faqSeo } from '../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...faqSeo} />
      <FAQScreen faq={faq} />
      <FAQPageJsonLd
        mainEntity={faq.map((data) => ({
          questionName: data.question,
          acceptedAnswerText: data.answer,
        }))}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
