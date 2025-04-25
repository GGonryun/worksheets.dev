import { devRoutes } from '@worksheets/routes';
import { DashboardLayout, TeamSettings } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <TeamSettings activeTab="profile" />;
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
          label: 'Settings',
          href: devRoutes.dashboard.settings.path(),
        },
      ]}
    >
      {page}
    </DashboardLayout>
  );
};

export default Page;
