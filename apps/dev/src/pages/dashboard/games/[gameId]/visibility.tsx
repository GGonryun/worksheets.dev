import { devRoutes } from '@worksheets/routes';
import { DashboardLayout, UpdateGame } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const gameId = router.query.gameId as string | undefined;

  if (!gameId) {
    return <></>;
  }

  return <UpdateGame gameId={gameId} activeTab="visibility" />;
};

Page.getLayout = (page) => {
  return (
    <DashboardLayout
      crumbs={[
        {
          label: 'Dashboard',
          href: devRoutes.dashboard.path(),
        },
        {
          label: 'Edit Game',
          href: devRoutes.dashboard.games.view.path({
            params: {
              gameId: 'gameId',
            },
          }),
        },
      ]}
    >
      {page}
    </DashboardLayout>
  );
};

export default Page;
