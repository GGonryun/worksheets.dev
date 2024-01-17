import { FavoriteBorder } from '@mui/icons-material';
import { Divider, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { SettingsPanels } from '@worksheets/util/enums';
import { FC } from 'react';

import { usePanelController } from '../__hooks__/use-panel-controller';
import { PanelFooter } from '../panel-footer';
import { PanelHeader } from '../panel-header';
import { DangerZoneSection, ProfileSection } from './sections';

export const SettingsPanel: FC<{
  bookmark?: SettingsPanels;
  onClearLocalStorage: () => void;
  onDeleteAccount: () => void;
}> = ({ bookmark, onClearLocalStorage, onDeleteAccount }) => {
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
        <FavoriteBorder fontSize="small" color="love" />
        <Typography>
          Help us grow by sharing your{' '}
          <Link href="/account/referrals">referral link</Link> with friends and
          family.
        </Typography>
      </Box>

      <PanelFooter
        learn={{ text: 'Account Settings', href: '/help/account' }}
        action={{
          text: 'Log Out',
          href: '/logout',
          color: 'error',
        }}
      />
    </Box>
  );
};
