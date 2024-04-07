import { Panel } from '@worksheets/ui/components/panels';
import { ReactNode } from 'react';

export const IntegrationsPanel = () => (
  <Panel
    header={{
      primary: '',
      secondary: undefined,
      icon: undefined,
    }}
    footer={{
      learn: {
        text: '',
        href: '',
      },
      action: undefined,
    }}
    sections={function (
      active: unknown,
      toggle: (panel: unknown) => void
    ): ReactNode | ReactNode[] {
      throw new Error('Function not implemented.');
    }}
  />
);
