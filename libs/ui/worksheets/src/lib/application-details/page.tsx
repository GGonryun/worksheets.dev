import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Link,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { trpc } from '@worksheets/trpc/ide';
import { GetApplicationDetailsResponse } from '@worksheets/schemas-applications';
import { ArrowBackIos } from '@mui/icons-material';
import { a11yProps } from '../shared/tab-panel';
import { OverviewPanel } from './panels/overview-panel';
import { ApiPanel } from './panels/api/api-panel';
import { TutorialPanel } from './panels/tutorial-panel';
import { ConnectionsPanel } from './panels/connections/connections-panel';
import { useRouter } from 'next/router';
import { ApplicationsFooter } from '../applications-gallery/applications-footer';
import { HorizontalSpreadLayout } from '../shared/horizontal-spread-layout';
import { formatTimestamp } from '@worksheets/util/time';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { useTitle } from '@worksheets/ui/common';

type ApplicationDetailsTabs = 'overview' | 'api' | 'tutorials' | 'connections';

export const ApplicationDetailsPage: React.FC<{
  appId: string;
  resource?: ApplicationDetailsTabs;
}> = ({ appId, resource }) => {
  const { data: appDetails } = trpc.applications.details.useQuery(
    {
      appId: appId,
    },
    { enabled: !!appId }
  );

  const { data: methods } = trpc.applications.methods.list.useQuery(
    {
      appId: appId,
    },
    {
      enabled: !!appId,
    }
  );

  const setTitle = useTitle();
  useEffect(() => {
    const title = appDetails?.title ?? 'Application Details';
    const resourceLabel = resourceMapLabels[resource ?? 'overview'];
    setTitle(`${title} - ${resourceLabel} - Worksheets`);
  }, [appDetails, resource, setTitle]);

  if (!appDetails || !methods) return <Box />;

  return (
    <HorizontalSpreadLayout
      header={
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
          })}
        >
          <Container maxWidth={'xl'}>
            <ApplicationsLink />
            <Header app={appDetails} />
          </Container>
          <Divider />
          <Container maxWidth={'xl'}>
            <AppTabs app={appDetails} resource={resource} />
          </Container>
        </Box>
      }
      body={
        <>
          {(!resource || resource === 'overview') && (
            <OverviewPanel app={appDetails} methods={methods} />
          )}
          {resource === 'api' && (
            <ApiPanel app={appDetails} methods={methods} />
          )}
          {resource === 'tutorials' && <TutorialPanel app={appDetails} />}
          {resource === 'connections' && (
            <ConnectionsPanel app={appDetails} methods={methods} />
          )}
        </>
      }
      footer={<ApplicationsFooter app={appDetails} />}
    />
  );
};

const ApplicationsLink: React.FC = () => (
  <Typography variant="body1" color="text.secondary" p={2}>
    <Link
      underline="hover"
      color="inherit"
      href="/applications"
      display="flex"
      alignItems="center"
      gap={0.5}
    >
      <ArrowBackIos fontSize="inherit" color="inherit" />
      Applications
    </Link>
  </Typography>
);

const Header: React.FC<{ app: GetApplicationDetailsResponse }> = ({ app }) => (
  <Box pb={2} px={3} display="flex" flexDirection="column" gap={1}>
    <Box display="flex" alignItems="center" gap={3}>
      <TinyLogo area={56} label={app.title} src={app.logo} borderless />
      <Box>
        <Typography variant="h4" fontWeight={900}>
          {app.title}
        </Typography>
        <Typography>
          By: <Link>{app.creator}</Link>, Last Updated:{' '}
          {formatTimestamp(app.lastUpdated)}
        </Typography>
      </Box>
    </Box>
  </Box>
);

const resourceMap: Record<ApplicationDetailsTabs, number> = {
  overview: 0,
  api: 1,
  tutorials: 2,
  connections: 3,
};

const resourceMapReverse: Record<number, ApplicationDetailsTabs> = {
  0: 'overview',
  1: 'api',
  2: 'tutorials',
  3: 'connections',
};

const resourceMapLabels: Record<ApplicationDetailsTabs, string> = {
  overview: 'Overview',
  api: 'API',
  tutorials: 'Tutorials',
  connections: 'Connections',
};

const AppTabs: React.FC<{
  app: GetApplicationDetailsResponse;
  resource?: ApplicationDetailsTabs;
}> = ({ resource = 'overview', app }) => {
  const { push } = useRouter();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    push(`/applications/${app.appId}/${resourceMapReverse[newValue]}`);
  };

  const props = (label: string, index: number) => ({
    ...a11yProps(index),
    sx: { minHeight: '36px', height: '36px' },
    label: label,
  });

  return (
    <Tabs
      value={resourceMap[resource] ?? 0}
      onChange={handleChange}
      aria-label="basic tabs example"
      sx={{ minHeight: '36px', height: '36px' }}
    >
      <Tab {...props('Overview', 0)} />
      <Tab {...props('API', 1)} />
      <Tab {...props('Tutorials', 2)} />
      <Tab {...props('Connections', 3)} />
    </Tabs>
  );
};
