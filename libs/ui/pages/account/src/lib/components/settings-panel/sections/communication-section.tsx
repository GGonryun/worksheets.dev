import { EmailOutlined } from '@mui/icons-material';
import { Box, Link, TextField, Typography } from '@mui/material';
import { ValentinesPhones } from '@worksheets/icons/valentines';
import { SettingsPanels } from '@worksheets/util/enums';

import { CollapsibleSection } from '../../collapsible-section';
import { PanelFooter } from '../../panel-footer';

export const CommunicationSection: React.FC<{
  active: SettingsPanels | undefined;
  onClick: (id: string) => void;
  primaryEmail: string;
}> = ({ active, onClick, primaryEmail }) => {
  return (
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
          variant="standard"
          label="Primary Email"
          value={primaryEmail}
          onChange={() => {
            // ignore changes
          }}
          helperText={
            'Your primary email is used for account recovery and important notifications. This cannot be changed.'
          }
          InputLabelProps={{ shrink: true }}
        />

        <Typography fontWeight={700} color="error.main" gutterBottom>
          More communication settings will be available soon. Stay tuned!
        </Typography>
        <Typography>
          <Link href="/contact">Contact us</Link> if you have suggestions or
          need help.
        </Typography>

        <PanelFooter
          learn={{
            text: 'Accounts & Profiles',
            href: '/help/account',
          }}
        />
      </Box>
    </CollapsibleSection>
  );
};
