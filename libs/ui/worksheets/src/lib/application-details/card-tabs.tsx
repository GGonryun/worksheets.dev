import { Box, Tabs, Tab } from '@mui/material';
import React, { useEffect } from 'react';
import { OverviewTabPanel } from './overview-tab-panel';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import { useRouter } from 'next/router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: '100%', overflow: 'scroll' }}
    >
      {value === index && (
        <Box height="100%" p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const hashToTabIndex: Record<number, string> = {
  0: '#overview',
  1: '#methods',
  2: '#details',
};

const tabIndexToHash: Record<string, number> = {
  '#overview': 0,
  '#methods': 1,
  '#details': 2,
};

export const CardTabs: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ app, methods }) => {
  const { push, asPath } = useRouter();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const hash = asPath.split('#')[1];
    if (hash && hash.startsWith('method-')) {
      setValue(2);
    } else if (hash) {
      setValue(tabIndexToHash[`#${hash}`]);
    }
  }, [asPath]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    push(hashToTabIndex[newValue]);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Methods" {...a11yProps(1)} />
          <Tab label="Details" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={0} index={0}>
        <OverviewTabPanel app={app} methods={methods} />
      </CustomTabPanel>
    </Box>
  );
};
