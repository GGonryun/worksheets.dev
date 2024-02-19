import { FavoriteBorder } from '@mui/icons-material';
import { Divider, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { routes } from '@worksheets/ui/routes';
import { SettingsPanels } from '@worksheets/util/enums';
import { NotificationPreferencesSchema } from '@worksheets/util/types';
import { FC } from 'react';

import { usePanelController } from '../hooks/use-panel-controller';
import { PanelFooter } from '../panel-footer';
import { PanelHeader } from '../panel-header';
import { DangerZoneSection, ProfileSection } from './sections';
import { CommunicationSection } from './sections/communication-section';

export const SettingsPanel: FC<{
  bookmark?: SettingsPanels;
  preferences: NotificationPreferencesSchema;
  onUpdatePreferences: (
    preferences: Omit<NotificationPreferencesSchema, 'email'>
  ) => void;
  onClearLocalStorage: () => void;
  onDeleteAccount: () => void;
}> = ({
  bookmark,
  onClearLocalStorage,
  onDeleteAccount,
  onUpdatePreferences,
  preferences,
}) => {
  const { active, toggleActive } = usePanelController(bookmark);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <PanelHeader primary="Settings" />

      <Divider />

      <ProfileSection active={active} onClick={toggleActive} />

      <CommunicationSection
        active={active}
        onClick={toggleActive}
        preferences={preferences}
        onUpdatePreferences={onUpdatePreferences}
      />

      <DangerZoneSection
        active={active}
        onClick={toggleActive}
        onClearLocalStorage={onClearLocalStorage}
        onDeleteAccount={onDeleteAccount}
      />

      <Divider />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <FavoriteBorder fontSize="small" color="secondary" />
        <Typography>
          Help us grow by sharing your{' '}
          <Link href={routes.account.referrals.path()}>referral link</Link> with
          friends and family.
        </Typography>
      </Box>

      <PanelFooter
        learn={{ text: 'Account Settings', href: routes.help.accounts.path() }}
        action={{
          text: 'Log Out',
          href: routes.logout.path(),
          color: 'error',
        }}
      />
    </Box>
  );
};
