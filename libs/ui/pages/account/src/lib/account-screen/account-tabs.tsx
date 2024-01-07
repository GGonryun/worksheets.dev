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
        <Tab label="Profile" value={AccountTabsHref.PROFILE} />
        <Tab label="Submissions" value={AccountTabsHref.SUBMISSIONS} />
      </Tabs>
      <Divider />
    </Box>
  );
};
