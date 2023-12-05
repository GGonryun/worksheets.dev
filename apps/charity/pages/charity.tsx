import { NextPageWithLayout } from '@worksheets/util-next';
import { CharityScreen } from '@worksheets/ui/pages/charity';
import { LayoutContainer } from '../containers/layout-container';
import { campaigns, charities } from '@worksheets/data-access/charity-games';
import { NextSeo } from 'next-seo';

const openGraph = {
  url: 'https://www.charity.games/charity',
  title: 'Charity Games - Donate by Playing Free Online Games',
  description:
    'Charity Games is a non profit organization that donates money by playing free online browser games.',
};

const Page: NextPageWithLayout = () => {
  const campaign = campaigns['primary'];

  const charity = charities[campaign.organizationId];

  if (!charity) {
    throw new Error('Charity not found');
  }

  return (
    <>
      <NextSeo
        title={openGraph.title}
        description={openGraph.description}
        canonical={openGraph.url}
        openGraph={openGraph}
      />
      <CharityScreen
        charity={charity}
        pledge={campaign.pledge}
        statistics={campaign.statistics}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
