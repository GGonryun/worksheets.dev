import { devRoutes } from '@worksheets/routes';
import { DashboardLayout, TeamUsers } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <TeamUsers />;
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
