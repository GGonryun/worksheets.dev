import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { FC, ReactNode } from 'react';

import { AccountTabs } from './account-tabs';
import { TabPanel } from './tab-panel';
import { AccountTabsHref } from './tabs';

export type AccountScreenProps = {
  path: string;
  settingsPanel: ReactNode;
  submissionsPanel: ReactNode;
  referralsPanel: ReactNode;
  friendsPanel: ReactNode;
  questsPanel: ReactNode;
  inventory: ReactNode;
  notificationsPanel: ReactNode;
  integrationsPanel: ReactNode;
};

export const AccountScreen: FC<AccountScreenProps> = ({
  path,
  settingsPanel,
  submissionsPanel,
  referralsPanel,
  friendsPanel,
  inventory,
  questsPanel,
  notificationsPanel,
  integrationsPanel,
}) => {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
        }}
      >
        <Box display="flex" flexDirection="column">
          <Box my={{ xs: 1, sm: 1.5 }} />
          <AccountTabs path={path} />
          <TabPanel target={AccountTabsHref.SETTINGS} current={path}>
            {settingsPanel}
          </TabPanel>
          <TabPanel target={AccountTabsHref.INTEGRATIONS} current={path}>
            {integrationsPanel}
          </TabPanel>
          <TabPanel target={AccountTabsHref.NOTIFICATIONS} current={path}>
            {notificationsPanel}
          </TabPanel>
          <TabPanel target={AccountTabsHref.QUESTS} current={path}>
            {questsPanel}
          </TabPanel>
          <TabPanel target={AccountTabsHref.INVENTORY} current={path}>
            {inventory}
          </TabPanel>
          <TabPanel target={AccountTabsHref.FRIENDS} current={path}>
            {friendsPanel}
          </TabPanel>
          <TabPanel target={AccountTabsHref.REFERRALS} current={path}>
            {referralsPanel}
          </TabPanel>
          <TabPanel target={AccountTabsHref.SUBMISSIONS} current={path}>
            {submissionsPanel}
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
};
