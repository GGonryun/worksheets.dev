import { devRoutes } from '@worksheets/routes';
import { Button, CreateGame, DashboardLayout } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';
import Link from 'next/link';

const Page: NextPageWithLayout = () => {
  return <CreateGame />;
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
          label: 'Create New Game',
          href: devRoutes.dashboard.games.new.path(),
        },
      ]}
      accent={
        <Button size="sm" variant="outline">
          <Link href={devRoutes.dashboard.path()}>Cancel</Link>
        </Button>
      }
    >
      {page}
    </DashboardLayout>
  );
};

export default Page;
