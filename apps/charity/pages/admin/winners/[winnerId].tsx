import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminWinnerScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

type Props = {
  winnerId: string;
};

const Page: NextPageWithLayout<Props> = ({ winnerId }) => (
  <>
    <NextSeo noindex title="Admin - Winner Details" />
    <DynamicAdminWinnerScreen winnerId={winnerId} />
  </>
);

export const getServerSideProps = adminMiddleware<Props>(async (ctx) => {
  const winnerId = ctx.params?.winnerId as string;
  if (!winnerId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      winnerId,
    },
  };
});

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
