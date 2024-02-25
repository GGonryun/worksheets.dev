import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminGameScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

type Props = {
  gameId: string;
};

const Page: NextPageWithLayout<Props> = ({ gameId }) => (
  <>
    <NextSeo noindex title="Admin - Game Details" />
    <DynamicAdminGameScreen gameId={gameId} />
  </>
);

export const getServerSideProps = adminMiddleware<Props>(async (ctx) => {
  const gameId = ctx.params?.gameId as string;
  if (!gameId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      gameId,
    },
  };
});

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
