import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQScreen } from '@worksheets/ui/pages/faq';
import { LayoutContainer } from '../containers/layout-container';
import { faq } from '@worksheets/data-access/charity-games';
import { FAQPageJsonLd, NextSeo } from 'next-seo';
import { faqSeo } from '../util/seo';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const { asPath } = useRouter();
  const bookmark = asPath.split('#').at(-1);

  return (
    <>
      <NextSeo {...faqSeo} />
      <FAQScreen faq={faq} bookmark={bookmark} />
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
