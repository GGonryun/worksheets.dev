import {
  Box,
  Tabs,
  Tab,
  Divider,
  Button,
  Container,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import { SettingsCardBilling } from './cards/billing';
import { SettingsCardAccessTokens } from './cards/access-tokens/access-tokens';
import { SettingsCardGeneric } from './cards/generic';
import { TabPanel, a11yProps } from '../shared/tab-panel';
import { trpc } from '@worksheets/trpc/ide';
import { GeneralSettings } from './cards/general-settings';
import { useUser } from '@worksheets/ui/common';

export enum SettingsTabIndex {
  General = 0,
  Billing = 1,
  AccessTokens = 2,
  DangerZone = 3,
}

export const SettingsTabTitles: Record<SettingsTabIndex, string> = {
  [SettingsTabIndex.General]: 'General',
  [SettingsTabIndex.AccessTokens]: 'Access Tokens',
  [SettingsTabIndex.Billing]: 'Billing',
  [SettingsTabIndex.DangerZone]: 'Danger Zone',
};

export const SettingsTabs: React.FC<{
  tab: SettingsTabIndex;
}> = ({ tab }) => {
  const { push } = useRouter();
  const { user } = useUser();
  const { data: overview, isLoading } = trpc.user.overview.useQuery(
    { acknowledge: true },
    {
      enabled: !!user,
    }
  );

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: SettingsTabIndex
  ) => {
    switch (newValue) {
      case SettingsTabIndex.General:
        push(`/settings/general`);
        break;
      case SettingsTabIndex.Billing:
        push(`/settings/billing`);
        break;
      case SettingsTabIndex.AccessTokens:
        push(`/settings/access-tokens`);
        break;
      case SettingsTabIndex.DangerZone:
        push(`/settings/danger-zone`);
        break;
    }
  };

  if (!overview || isLoading)
    return (
      <Box display="flex" height="100%" width="100%">
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Tabs value={tab} onChange={handleChange} aria-label="execution tabs">
        <Tab label="General" {...a11yProps(SettingsTabIndex.General)} />
        <Tab label="Billing" {...a11yProps(SettingsTabIndex.Billing)} />
        <Tab label="Tokens" {...a11yProps(SettingsTabIndex.AccessTokens)} />
        <Tab label="Danger" {...a11yProps(SettingsTabIndex.DangerZone)} />
      </Tabs>
      <Divider />

      <TabPanel value={tab} index={SettingsTabIndex.General}>
        <Container maxWidth="md">
          <Box p={3} display="flex" gap={3} flexWrap={'wrap'}>
            <GeneralSettings overview={overview} />
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={tab} index={SettingsTabIndex.Billing}>
        <Container maxWidth="md">
          <Box p={3}>
            <SettingsCardBilling overview={overview} />
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={tab} index={SettingsTabIndex.AccessTokens}>
        <Container maxWidth="md">
          <Box p={3}>
            <SettingsCardAccessTokens overview={overview} />
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={tab} index={SettingsTabIndex.DangerZone}>
        <Container maxWidth="md">
          <Box p={3}>
            <SettingsCardGeneric
              color="warning"
              title={'Pause your worksheets'}
              caption={'Temporarily halt all executions on your account.'}
            >
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={() =>
                    alert(
                      "we've been notified about this, if you need your account paused right away contact customer support"
                    )
                  }
                >
                  Pause worksheets
                </Button>
              </Box>
            </SettingsCardGeneric>
          </Box>
          <Box px={3} pb={3}>
            <SettingsCardGeneric
              color="error"
              title={'Delete all your data'}
              caption={
                'Permanently remove your account and all of its contents.  This action cannot be undone.'
              }
            >
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() =>
                    alert(
                      "we've been notified about this, if you need your account deleted right away contact customer support"
                    )
                  }
                >
                  Delete account
                </Button>
              </Box>
            </SettingsCardGeneric>
          </Box>
        </Container>
      </TabPanel>
    </>
  );
};
