import { OnboardingFlow } from '@worksheets/ui/shadcn';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return (
    <div className="min-h-screen w-screen overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <main className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8">Create a Team</h1>
          <OnboardingFlow />
        </main>
      </div>
    </div>
  );
};

export default Page;
