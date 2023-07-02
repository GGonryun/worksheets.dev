import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ExecutionDetails } from './execution-details/execution-details';
import { SourceEditor } from './source-editor/source-editor';
import { Divider } from '@mui/material';
import { GeneralConfiguration } from './general-configuration/general-configuration';
import { ConnectionsSelector } from './connections-selector';
import { LogList } from './log-list/log-list';
import { useRouter } from 'next/router';
import { a11yProps, TabPanel } from '../shared/tab-panel';

export enum WorksheetTabIndex {
  Executions = 0,
  Worksheet = 1,
  Logs = 2,
  Settings = 3,
  Connections = 4,
}

export const WorksheetTabs: React.FC<{
  value: WorksheetTabIndex;
  worksheetId: string;
}> = ({ worksheetId, value }) => {
  const { push } = useRouter();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: WorksheetTabIndex
  ) => {
    switch (newValue) {
      case WorksheetTabIndex.Executions:
        push(`/worksheets/${worksheetId}/executions`);
        break;
      case WorksheetTabIndex.Worksheet:
        push(`/worksheets/${worksheetId}/worksheet`);
        break;
      case WorksheetTabIndex.Logs:
        push(`/worksheets/${worksheetId}/logs`);
        break;
      case WorksheetTabIndex.Settings:
        push(`/worksheets/${worksheetId}/settings`);
        break;
      case WorksheetTabIndex.Connections:
        push(`/worksheets/${worksheetId}/connections`);
        break;
    }
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label="execution tabs">
        <Tab label="Executions" {...a11yProps(WorksheetTabIndex.Executions)} />
        <Tab label="Worksheet" {...a11yProps(WorksheetTabIndex.Worksheet)} />
        <Tab label="Logs" {...a11yProps(WorksheetTabIndex.Logs)} />
        <Tab label="Settings" {...a11yProps(WorksheetTabIndex.Settings)} />
        <Tab
          label="Connections"
          {...a11yProps(WorksheetTabIndex.Connections)}
        />
      </Tabs>
      <Divider />

      <TabPanel value={value} index={WorksheetTabIndex.Executions}>
        <ExecutionDetails />
      </TabPanel>
      <TabPanel value={value} index={WorksheetTabIndex.Worksheet}>
        <SourceEditor />
      </TabPanel>
      <TabPanel value={value} index={WorksheetTabIndex.Logs}>
        <LogList showExecutionIds worksheetId={worksheetId} />
      </TabPanel>
      <TabPanel value={value} index={WorksheetTabIndex.Settings}>
        <GeneralConfiguration />
      </TabPanel>
      <TabPanel value={value} index={WorksheetTabIndex.Connections}>
        <ConnectionsSelector />
      </TabPanel>
    </>
  );
};
