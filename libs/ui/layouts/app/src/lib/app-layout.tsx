import './styles.css';

import { AppLayout as AppLayoutComponent } from '@worksheets/ui/layout';
import { BaseLayout } from '@worksheets/ui/layouts/shared';
import { AppProvider } from '@worksheets/ui/suspense';
import authOptions from '@worksheets/util/auth';
import { getServerSession } from 'next-auth/next';

export async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <BaseLayout>
      <AppProvider session={session}>
        <AppLayoutComponent>{children}</AppLayoutComponent>
      </AppProvider>
    </BaseLayout>
  );
}
