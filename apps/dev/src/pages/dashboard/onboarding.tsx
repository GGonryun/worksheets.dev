import { OnboardingFlow } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';

import { DeveloperDashboardLayout } from '../../components/layout';

const Page: NextPageWithLayout = () => {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Create a Team</h1>
      <OnboardingFlow />
    </main>
  );
};

Page.getLayout = (page) => {
  return <DeveloperDashboardLayout>{page}</DeveloperDashboardLayout>;
};

export default Page;
