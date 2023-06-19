import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ExecutionDetails } from './execution-details/execution-details';
import { SourceEditor } from './source-editor/source-editor';
import { Divider } from '@mui/material';
import { GeneralConfiguration } from './general-configuration/general-configuration';
import { ConnectionsSelector } from './connections-selector';
import { LogList } from './log-list/log-list';
import { TriggersContainer } from './triggers-container';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  if (value !== index) {
    return null;
  }
  return <Box height="100%">{value === index && children}</Box>;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function WorksheetTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label="execution tabs">
        <Tab label="Executions" {...a11yProps(0)} />
        <Tab label="YAML" {...a11yProps(1)} />
        <Tab label="Logs" {...a11yProps(2)} />
        <Tab label="Triggers" {...a11yProps(3)} />
        <Tab label="Settings" {...a11yProps(4)} />
        <Tab label="Connections" {...a11yProps(5)} />
      </Tabs>
      <Divider />

      <TabPanel value={value} index={0}>
        <ExecutionDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SourceEditor />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LogList logs={[]} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TriggersContainer triggers={[]} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <GeneralConfiguration details={[]} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ConnectionsSelector connections={[]} />
      </TabPanel>
    </>
  );
}
