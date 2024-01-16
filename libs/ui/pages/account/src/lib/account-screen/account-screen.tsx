import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { FC, ReactNode } from 'react';

import { AccountHeader } from './account-header';
import { AccountTabs } from './account-tabs';
import { TabPanel } from './tab-panel';
import { AccountTabsHref } from './tabs';

export type AccountScreenProps = {
  path: string;
  onLogout: () => void;
  profilePanel: ReactNode;
  submissionsPanel: ReactNode;
  tokensPanel: ReactNode;
  referralsPanel: ReactNode;
  friendsPanel: ReactNode;
};

export const AccountScreen: FC<AccountScreenProps> = ({
  path,
  onLogout,
  profilePanel,
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
          <AccountHeader onLogout={onLogout} />
          <AccountTabs path={path} />
          <TabPanel target={AccountTabsHref.PROFILE} current={path}>
            {profilePanel}
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
