import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminPrizeScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

type Props = {
  prizeId: string;
};

const Page: NextPageWithLayout<Props> = ({ prizeId }) => (
  <>
    <NextSeo noindex title="Admin - Prize Details" />
    <DynamicAdminPrizeScreen prizeId={prizeId} />
  </>
);

export const getServerSideProps = adminMiddleware<Props>(async (ctx) => {
  const prizeId = ctx.params?.prizeId as string;
  if (!prizeId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      prizeId,
    },
  };
});

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
