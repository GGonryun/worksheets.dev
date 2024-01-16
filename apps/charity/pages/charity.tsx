import { campaigns, charities } from '@worksheets/data-access/charity-games';
import { trpc } from '@worksheets/trpc-charity';
import { CharityScreen } from '@worksheets/ui/pages/charity';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { DynamicLayout } from '../dynamic/dynamic-layout';
import { charitySeo } from '../util/seo';

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
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
