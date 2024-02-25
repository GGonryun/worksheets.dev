import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminRaffleScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

type Props = {
  raffleId: number;
};

const Page: NextPageWithLayout<Props> = ({ raffleId }) => (
  <>
    <NextSeo noindex title="Admin - Raffle Details" />
    <DynamicAdminRaffleScreen raffleId={raffleId} />
  </>
);

export const getServerSideProps = adminMiddleware<Props>(async (ctx) => {
  const raffleId = ctx.params?.raffleId as string;
  if (!raffleId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      raffleId: Number(raffleId),
    },
  };
});

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
