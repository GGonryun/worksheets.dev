import { devRoutes } from '@worksheets/routes';
import { DashboardLayout, TeamManagement } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <TeamManagement activeTab="pending" />;
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
          label: 'Users',
          href: devRoutes.dashboard.users.path(),
        },
      ]}
    >
      {page}
    </DashboardLayout>
  );
};

export default Page;
