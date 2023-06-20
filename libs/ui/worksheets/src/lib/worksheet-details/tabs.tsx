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
import { useRouter } from 'next/router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: TabIndex;
}

export enum TabIndex {
  Executions = 0,
  YAML = 1,
  Logs = 2,
  Triggers = 3,
  Settings = 4,
  Connections = 5,
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

export const WorksheetTabs: React.FC<{
  value: TabIndex;
  worksheetId: string;
}> = ({ worksheetId, value }) => {
  const { push } = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: TabIndex) => {
    switch (newValue) {
      case TabIndex.Executions:
        push(`/worksheets/${worksheetId}/executions`);
        break;
      case TabIndex.YAML:
        push(`/worksheets/${worksheetId}/yaml`);
        break;
      case TabIndex.Logs:
        push(`/worksheets/${worksheetId}/logs`);
        break;
      case TabIndex.Triggers:
        push(`/worksheets/${worksheetId}/triggers`);
        break;
      case TabIndex.Settings:
        push(`/worksheets/${worksheetId}/settings`);
        break;
      case TabIndex.Connections:
        push(`/worksheets/${worksheetId}/connections`);
        break;
    }
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
};
