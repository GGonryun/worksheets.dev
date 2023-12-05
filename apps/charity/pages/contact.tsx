import { NextPageWithLayout } from '@worksheets/util-next';
import { ContactScreen } from '@worksheets/ui/pages/contact';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';

const openGraph = {
  url: 'https://www.charity.games/contact',
  title: 'Charity Games - Contact Us',
  description:
    'If you have any questions, comments, or concerns about Charity Games, please feel free to contact us. We typically respond within 48 hours.',
};

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo
      title={openGraph.title}
      description={openGraph.description}
      canonical={openGraph.url}
      openGraph={openGraph}
    />
    <ContactScreen />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
