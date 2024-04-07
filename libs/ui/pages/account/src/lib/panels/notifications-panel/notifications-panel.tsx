import { routes } from '@worksheets/routes';
import { Panel } from '@worksheets/ui/components/panels';

export const NotificationsPanel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Panel
    header={{
      primary: 'Notifications',
    }}
    footer={{
      learn: {
        text: 'Notifications',
        href: routes.help.notifications.path(),
      },
      action: {
        text: 'Account Settings',
        href: routes.account.path(),
        color: 'secondary',
      },
    }}
    sections={() => children}
  />
);
