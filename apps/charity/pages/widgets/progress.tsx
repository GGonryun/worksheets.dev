// this page is used by our partners to embed the progress bar on their website
import { NextPageWithLayout } from '@worksheets/util-next';
import { ProgressWidget, campaigns } from '@worksheets/ui-charity';

const Page: NextPageWithLayout = () => {
  const campaign = campaigns['primary'];
  if (!campaign) throw new Error('Campaign not found');

  return (
    <ProgressWidget
      current={campaign.pledge.current}
      required={campaign.pledge.required}
    />
  );
};

export default Page;
