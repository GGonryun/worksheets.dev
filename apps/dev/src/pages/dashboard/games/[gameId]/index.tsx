import { trpc } from '@worksheets/trpc-charity';
import { DashboardLayout } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  const user = trpc.user.get.useQuery();
  if (user.isPending) {
    return <div>Loading...</div>;
  }
  if (user.isError) {
    return <div>Error: {user.error.message}</div>;
  }
  return <div>This is the game edit page</div>;
};

Page.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
