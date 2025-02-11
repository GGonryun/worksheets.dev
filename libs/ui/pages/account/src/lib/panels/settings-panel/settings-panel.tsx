import { Link } from '@mui/material';
import { helpRoutes, portalRoutes } from '@worksheets/routes';
import { Panel } from '@worksheets/ui/components/panels';
import { SettingsPanels } from '@worksheets/util/enums';
import { FC, ReactNode } from 'react';

import { DangerZoneSection, ProfileSection } from './sections';
import { CommunicationSection } from './sections/communication-section';

export const SettingsPanel: FC<{
  bookmark?: SettingsPanels;
  form: ReactNode;
  onClearLocalStorage: () => void;
  onDeleteAccount: () => void;
}> = ({ bookmark, form, onClearLocalStorage, onDeleteAccount }) => {
  return (
    <Panel
      bookmark={bookmark}
      header={{
        primary: 'My Account',
      }}
      note={{
        content: (
          <>
            We take your privacy and security seriously.{' '}
            <Link
              href={helpRoutes.privacy.url()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </Link>
          </>
        ),
      }}
      footer={{
        learn: {
          text: 'Account Settings',
          href: helpRoutes.accounts.url(),
        },
        action: {
          text: 'Log Out',
          href: portalRoutes.logout.url(),
          color: 'error',
        },
      }}
      sections={(active, toggle) => (
        <>
          <ProfileSection active={active} onClick={toggle} />

          <CommunicationSection form={form} active={active} onClick={toggle} />

          <DangerZoneSection
            active={active}
            onClick={toggle}
            onClearLocalStorage={onClearLocalStorage}
            onDeleteAccount={onDeleteAccount}
          />
        </>
      )}
    ></Panel>
  );
};
