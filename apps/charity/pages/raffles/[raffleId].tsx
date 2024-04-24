import { AppLayoutContainer } from '@worksheets/ui/layout';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { DynamicRaffleScreen } from '@worksheets/ui/pages/raffles';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { rafflesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const raffleId = Number(query?.raffleId);

  if (!raffleId) return <LoadingScreen />;

  return (
    <>
      <NextSeo {...rafflesSeo} />
      <DynamicRaffleScreen raffleId={raffleId} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
