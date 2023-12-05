import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQScreen } from '@worksheets/ui/pages/faq';
import { LayoutContainer } from '../containers/layout-container';
import { faq } from '@worksheets/data-access/charity-games';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

const openGraph = {
  url: 'https://www.charity.games/faq',
  title: 'Charity Games - Frequently Asked Questions',
  description:
    'There are many ways to help Charity Games. Whether you are a developer, player, teacher, charity, content creator, professional, student, or parent, we would love to hear from you!',
};

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title={openGraph.title}
        description={openGraph.description}
        canonical={openGraph.url}
        openGraph={openGraph}
      />
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
