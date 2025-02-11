import './styles.css';

import { MarketingLayout as MarketingLayoutComponent } from '@worksheets/ui/layout';
import { BaseLayout } from '@worksheets/ui/layouts/shared';
import { MarketingProvider } from '@worksheets/ui/suspense';

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout>
      <MarketingProvider>
        <MarketingLayoutComponent>{children}</MarketingLayoutComponent>
      </MarketingProvider>
    </BaseLayout>
  );
}
