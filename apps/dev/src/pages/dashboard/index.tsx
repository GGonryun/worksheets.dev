import { devRoutes } from '@worksheets/routes';
import { DashboardLayout, GameDashboard } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <GameDashboard />;
};

Page.getLayout = (page) => {
  return (
    <DashboardLayout
      crumbs={[
        {
          label: 'Dashboard',
          href: devRoutes.dashboard.path(),
        },
      ]}
    >
      {page}
    </DashboardLayout>
  );
};

export default Page;
