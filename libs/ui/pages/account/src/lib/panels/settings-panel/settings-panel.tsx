import { Link } from '@mui/material';
import { routes } from '@worksheets/routes';
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
            Help us grow by sharing your{' '}
            <Link href={routes.account.referrals.path()}>referral link</Link>{' '}
            with friends and family.
          </>
        ),
      }}
      footer={{
        learn: {
          text: 'Account Settings',
          href: routes.help.accounts.path(),
        },
        action: {
          text: 'Log Out',
          href: routes.logout.path(),
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
