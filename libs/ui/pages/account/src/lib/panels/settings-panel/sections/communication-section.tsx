import { EmailOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { ValentinesPhones } from '@worksheets/icons/valentines';
import { helpRoutes } from '@worksheets/routes';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { SettingsPanels } from '@worksheets/util/enums';
import React from 'react';

import { CollapsibleSection } from '../../../components/collapsible-section';

export const CommunicationSection: React.FC<{
  active: SettingsPanels | undefined;
  onClick: (id: string) => void;
  form: React.ReactNode;
}> = ({ active, onClick, form }) => (
  <CollapsibleSection
    id={SettingsPanels.Communication}
    active={active}
    onClick={onClick}
    text={`Communications`}
    description="Change the types of notifications you receive from Charity Games."
    Icon={ValentinesPhones}
    status={<EmailOutlined fontSize="large" color="info" />}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant="h6">Newsletter Settings</Typography>
      {form}
      <PanelFooter
        learn={{
          text: 'Account & Profile',
          href: helpRoutes.accounts.url(),
        }}
      />
    </Box>
  </CollapsibleSection>
);
