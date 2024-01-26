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
  tokensPanel: ReactNode;
  referralsPanel: ReactNode;
  friendsPanel: ReactNode;
};

export const AccountScreen: FC<AccountScreenProps> = ({
  path,
  settingsPanel,
  submissionsPanel,
  tokensPanel,
  referralsPanel,
  friendsPanel,
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
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
          <TabPanel target={AccountTabsHref.TOKENS} current={path}>
            {tokensPanel}
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
