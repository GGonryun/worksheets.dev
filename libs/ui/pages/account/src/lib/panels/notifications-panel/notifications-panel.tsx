import { helpRoutes, portalRoutes } from '@worksheets/routes';
import { Panel } from '@worksheets/ui/components/panels';
import { HelpAccountQuestions } from '@worksheets/util/enums';

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
        href: helpRoutes.accounts.url({
          bookmark: HelpAccountQuestions.Notifications,
        }),
      },
      action: {
        text: 'Account Settings',
        href: portalRoutes.account.url(),
        color: 'secondary',
      },
    }}
    sections={() => children}
  />
);
