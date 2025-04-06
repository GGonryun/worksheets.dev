import { trpc } from '@worksheets/trpc-charity';
import { NextPageWithLayout } from '@worksheets/util-next';

import { DeveloperDashboardLayout } from './layout';

const Page: NextPageWithLayout = () => {
  const user = trpc.user.get.useQuery();
  if (user.isPending) {
    return <div>Loading...</div>;
  }
  if (user.isError) {
    return <div>Error: {user.error.message}</div>;
  }
  return <div>I am the dashboard: {user.data.email}</div>;
};

Page.getLayout = (page) => {
  return <DeveloperDashboardLayout>{page}</DeveloperDashboardLayout>;
};

export default Page;
