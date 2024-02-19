import { EmailOutlined } from '@mui/icons-material';
import {
  Box,
  FormControlLabel,
  Link,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { ValentinesPhones } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/ui/routes';
import { SettingsPanels } from '@worksheets/util/enums';
import { NotificationPreferencesSchema } from '@worksheets/util/types';

import { CollapsibleSection } from '../../collapsible-section';
import { PanelFooter } from '../../panel-footer';

export const CommunicationSection: React.FC<{
  active: SettingsPanels | undefined;
  onClick: (id: string) => void;
  onUpdatePreferences: (
    preferences: Omit<NotificationPreferencesSchema, 'email'>
  ) => void;
  preferences: NotificationPreferencesSchema;
}> = ({ active, onClick, preferences, onUpdatePreferences }) => (
  <CollapsibleSection
    id={SettingsPanels.Communication}
    active={active}
    onClick={onClick}
    text={`Communication Preferences`}
    description="How we communicate with you. Add or update your email, phone number, and more."
    Icon={ValentinesPhones}
    status={<EmailOutlined fontSize="large" color="info" />}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6">Communication Settings</Typography>

      <TextField
        disabled
        variant="standard"
        label="Primary Email"
        value={preferences.email}
        onChange={() => {
          // ignore changes
        }}
        helperText={
          'This cannot be changed. Your primary email is used for account recovery and important notifications.'
        }
        InputLabelProps={{ shrink: true }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={preferences.enabledEmailNotifications}
            onChange={(event) => {
              onUpdatePreferences({
                enabledEmailNotifications: event.target.checked,
              });
            }}
          />
        }
        label="Email Notifications"
      />

      <Typography>
        <Link href={routes.contact.path()}>Contact us</Link> if you have
        suggestions or need help.
      </Typography>

      <PanelFooter
        learn={{
          text: 'Account & Profile',
          href: routes.help.accounts.path(),
        }}
      />
    </Box>
  </CollapsibleSection>
);
