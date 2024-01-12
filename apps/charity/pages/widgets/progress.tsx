// this page is used by our partners to embed the progress bar on their website
import { campaigns } from '@worksheets/data-access/charity-games';
import { ProgressWidget } from '@worksheets/ui/widgets';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

const Page: NextPageWithLayout = () => {
  const campaign = campaigns['primary'];
  if (!campaign) throw new Error('Campaign not found');

  return (
    <>
      <NextSeo noindex={true} />
      <ProgressWidget
        current={campaign.pledge.current}
        required={campaign.pledge.required}
      />
    </>
  );
};

export default Page;
