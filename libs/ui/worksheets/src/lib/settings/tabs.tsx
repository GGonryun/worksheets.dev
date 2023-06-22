import { Box, Tabs, Tab, Divider, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { SettingsCardTextField } from './cards/text-field';
import { v4 as uuidv4 } from 'uuid';
import { SettingsCardPlans } from './cards/plans';
import { SettingsCardPayments } from './cards/payments';
import { SettingsCardAccessTokens } from './cards/access-tokens';
import { SettingsCardGeneric } from './cards/generic';
import { TabPanel, a11yProps } from '../shared/tab-panel';

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
            <SettingsCardTextField
              title={'Your identifier'}
              readonly
              caption={'This is how we identify you in our system.'}
              helperText="You can't change this value."
              value={uuidv4()}
            />
            <SettingsCardTextField
              title={'Your name'}
              caption={'Please enter a display name you are comfortable with.'}
              helperText="Display name is limited to 48 characters at most."
              value={'Miguel Campos'}
            />
            <SettingsCardTextField
              title={'Your email'}
              readonly
              caption={'The email address you use to log into your account.'}
              helperText="You can't change this value."
              value={'miguel@worksheets.dev'}
            />
            <SettingsCardTextField
              sensitive
              title={'Your password'}
              caption={
                "Enter a password for your account, we'll send you an email to verify."
              }
              helperText="Please use 60 characters at most, and at least 8 characters, numbers, and symbols."
              value={''}
            />
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={tab} index={SettingsTabIndex.Billing}>
        <Container maxWidth="md">
          <Box p={3}>
            <SettingsCardPlans plan="free" />
          </Box>
          <Box px={3} pb={3}>
            <SettingsCardPayments />
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={tab} index={SettingsTabIndex.AccessTokens}>
        <Container maxWidth="md">
          <Box p={3}>
            <SettingsCardAccessTokens />
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
                  onClick={() => alert("TODO: support 'pause account' feature")}
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
                    alert("TODO: support 'delete account' feature")
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
