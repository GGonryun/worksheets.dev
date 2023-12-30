import { NextPageWithLayout } from '@worksheets/util-next';
import { CharityScreen } from '@worksheets/ui/pages/charity';
import { LayoutContainer } from '../containers/layout-container';
import { campaigns, charities } from '@worksheets/data-access/charity-games';
import { NextSeo } from 'next-seo';
import { charitySeo } from '../util/seo';
import { trpc } from '@worksheets/trpc-charity';

const Page: NextPageWithLayout = () => {
  const { data: gamePopularity } = trpc.usage.popularity.useQuery();
  const campaign = campaigns['primary'];

  const charity = charities[campaign.organizationId];

  if (!charity) {
    throw new Error('Charity not found');
  }

  return (
    <>
      <NextSeo {...charitySeo} />
      <CharityScreen
        charity={charity}
        pledge={campaign.pledge}
        statistics={gamePopularity}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
