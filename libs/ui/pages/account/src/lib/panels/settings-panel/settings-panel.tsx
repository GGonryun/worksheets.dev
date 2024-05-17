import { PermIdentityOutlined } from '@mui/icons-material';
import { Button, Link } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { Panel } from '@worksheets/ui/components/panels';
import { SettingsPanels } from '@worksheets/util/enums';
import { useSession } from 'next-auth/react';
import { FC, ReactNode } from 'react';

import { DangerZoneSection, ProfileSection } from './sections';
import { CommunicationSection } from './sections/communication-section';

const ProfileButtonContainer = () => {
  const session = useSession();
  const user = trpc.user.get.useQuery(undefined, {
    enabled: session.status === 'authenticated',
  });
  if (user.isLoading || user.isError) return <PulsingLogo hideMessage />;

  return (
    <Button
      size="small"
      variant="arcade"
      color="secondary"
      startIcon={<PermIdentityOutlined />}
      href={routes.user.path({
        params: {
          userId: user.data?.id,
        },
      })}
    >
      Profile
    </Button>
  );
};

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
        icon: <ProfileButtonContainer />,
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
