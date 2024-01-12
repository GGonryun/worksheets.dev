import { faq, FAQScreen } from '@worksheets/ui/pages/faq';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { LayoutContainer } from '../containers/layout-container';
import { faqSeo } from '../util/seo';

const Page: NextPageWithLayout = () => {
  const { asPath } = useRouter();
  const bookmark = asPath.split('#').at(-1);

  return (
    <>
      <NextSeo {...faqSeo} />
      <FAQScreen faq={faq} bookmark={bookmark} />
      <FAQPageJsonLd
        mainEntity={faq
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
