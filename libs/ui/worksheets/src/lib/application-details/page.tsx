import WebsiteLayout from '../website-layout';
import React from 'react';
import {
  Box,
  Button,
  Divider,
  Link,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { trpc } from '@worksheets/trpc/ide';
import { TinyLogo } from '../shared/tiny-logo';
import { GetApplicationDetailsResponse } from '@worksheets/schemas-applications';
import { ArrowBackIos } from '@mui/icons-material';
import { a11yProps } from '../shared/tab-panel';
import { OverviewPanel } from './overview-panel';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { Flex } from '@worksheets/ui/common';
import { ApiPanel } from './panels/api/api-panel';
import { TutorialPanel } from './tutorial-panel';
import { ConnectionsPanel } from './connections-panel';
import { useRouter } from 'next/router';

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

  if (!appDetails || !methods) return <Box />;

  return (
    <WebsiteLayout secure={false}>
      <Box height="100%" display="flex" flexDirection="column">
        <Box
          flexShrink={0}
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
          })}
        >
          <ApplicationsLink />
          <Header app={appDetails} />
          <Divider />
          <AppTabs app={appDetails} resource={resource} />
          <Divider />
        </Box>
        <Box flex="1 0 auto">
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
        </Box>
        <Box flexShrink={0} pt={3}>
          <FooterSection app={appDetails} />
        </Box>
      </Box>
    </WebsiteLayout>
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
          By: <Link>{app.creator}</Link>, Last Updated: {app.lastUpdated}
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

const FooterSection: React.FC<{ app: GetApplicationDetailsResponse }> = ({
  app,
}) => {
  // use media query and set smaller padding if screen is small
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      width="100%"
      px={isMobile ? 3 : 12}
      py={isMobile ? 4 : 9}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Box>
        <Typography variant="h5" fontWeight={900}>
          Ready to get started?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The {app.title} API is free to try for 30 days. No credit card
          required.
        </Typography>
        <Flex pt={2} gap={2}>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? 'small' : 'medium'}
          >
            Sign Up
          </Button>
          <Typography variant="body2">
            <Link href={SERVER_SETTINGS.WEBSITES.DOCS_URL()}>
              Learn more about Worksheets
            </Link>
          </Typography>
        </Flex>
      </Box>
    </Box>
  );
};
