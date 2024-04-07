import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { AccountTabsHref } from './tabs';

export const AccountTabs: FC<{
  path: string;
}> = ({ path }) => {
  const { push } = useRouter();

  const handleChange = (_: React.SyntheticEvent, path: string) => {
    push(path);
  };

  return (
    <Box>
      <Divider />

      <Tabs
        value={path}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={true}
      >
        <Tab label="Settings" value={AccountTabsHref.SETTINGS} />
        <Tab label="Notifications" value={AccountTabsHref.NOTIFICATIONS} />
        <Tab label="Quests" value={AccountTabsHref.QUESTS} />
        <Tab label="Prizes" value={AccountTabsHref.PRIZES} />
        <Tab label="Friends" value={AccountTabsHref.FRIENDS} />
        <Tab label="Referrals" value={AccountTabsHref.REFERRALS} />
        <Tab label="Integrations" value={AccountTabsHref.INTEGRATIONS} />
        <Tab label="Submissions" value={AccountTabsHref.SUBMISSIONS} />
      </Tabs>
      <Divider />
    </Box>
  );
};
