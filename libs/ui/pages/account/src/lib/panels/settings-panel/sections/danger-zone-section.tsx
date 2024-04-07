import { GppMaybeOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Divider, Link, Typography } from '@mui/material';
import { ValentinesLock } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { SettingsPanels } from '@worksheets/util/enums';

import { CollapsibleSection } from '../../../components/collapsible-section';

export const DangerZoneSection: React.FC<{
  active: SettingsPanels | undefined;
  onClick: (id: string) => void;
  onClearLocalStorage: () => void;
  onDeleteAccount: () => void;
}> = ({ active, onClick, onClearLocalStorage, onDeleteAccount }) => {
  return (
    <CollapsibleSection
      id={SettingsPanels.DangerZone}
      active={active}
      onClick={onClick}
      text={`Danger Zone`}
      description="Delete your account or clear your local storage."
      Icon={ValentinesLock}
      status={<GppMaybeOutlined fontSize="large" color="warning" />}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">Dangerous Settings</Typography>

        <Alert severity="error">
          These settings are dangerous. Please be careful. You can not undo
          these actions!
          <br />
          <br />
          <Link href={routes.contact.path()} color="inherit">
            Contact us
          </Link>{' '}
          if you need assistance.
        </Alert>
        <Divider />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography fontWeight={700}>Delete Local Storage</Typography>
          <Typography variant="body3">
            Local storage is used to save your recently played games, login
            information, game progress, and other data. This action will clear
            all of that data.
          </Typography>
          <Button
            variant="arcade"
            color="warning"
            size="small"
            sx={{
              mt: 2,
              width: 'fit-content',
            }}
            onClick={onClearLocalStorage}
          >
            <Typography textTransform="none" fontWeight={900} variant="body2">
              Clear Storage
            </Typography>
          </Button>
        </Box>

        <Divider />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography fontWeight={700}>Delete Your Account</Typography>
          <Typography variant="body3">
            We'll miss you! This action will delete your account and all of your
            data. You will not be able to recover your account. You will need to
            create a new account to earn rewards again.
          </Typography>
          <Button
            variant="arcade"
            color="error"
            size="small"
            onClick={onDeleteAccount}
            sx={{
              width: 'fit-content',
              mt: 2,
            }}
          >
            <Typography textTransform="none" fontWeight={900} variant="body2">
              Delete Account
            </Typography>
          </Button>
        </Box>

        <Divider />

        <PanelFooter
          learn={{
            text: 'Account & Profile',
            href: routes.help.accounts.path(),
          }}
          action={{
            text: 'Contact Us',
            href: routes.contact.path(),
          }}
        />
      </Box>
    </CollapsibleSection>
  );
};
