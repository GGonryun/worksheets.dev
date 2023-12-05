import { NextPageWithLayout } from '@worksheets/util-next';
import { CharityScreen } from '@worksheets/ui/pages/charity';
import { LayoutContainer } from '../containers/layout-container';
import { campaigns, charities } from '@worksheets/data-access/charity-games';

const Page: NextPageWithLayout = () => {
  const campaign = campaigns['primary'];

  const charity = charities[campaign.organizationId];

  if (!charity) {
    throw new Error('Charity not found');
  }

  return (
    <CharityScreen
      charity={charity}
      pledge={campaign.pledge}
      statistics={campaign.statistics}
    />
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
