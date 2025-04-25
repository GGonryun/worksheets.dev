import { devRoutes } from '@worksheets/routes';
import { DashboardLayout, FeedbackList } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const gameId = router.query.gameId as string | undefined;

  if (!gameId) {
    return <></>;
  }

  return <FeedbackList gameId={gameId} />;
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
          label: 'Feedback',
          href: devRoutes.dashboard.games.view.feedback.path({
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
