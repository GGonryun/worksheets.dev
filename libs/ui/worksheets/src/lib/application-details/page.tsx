import React from 'react';

import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { FloatingLayout } from '../floating-layout';
import { trpc } from '@worksheets/trpc/ide';
import { TinyLogo } from '../shared/tiny-logo';
import { CheckCircle, HelpOutline, OpenInNew } from '@mui/icons-material';

import { ResourcesFooter } from '../shared/resources-footer';
import { CardTabs } from './card-tabs';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import { GetApplicationDetailsResponse } from '@worksheets/schemas-applications';

export const ApplicationDetailsPage: React.FC<{ appId: string }> = ({
  appId,
}) => {
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
    <FloatingLayout secure={false}>
      <Header app={appDetails} />
      <AdvertisementSection />
      <CardTabs app={appDetails} methods={methods} />
      <Footer />
    </FloatingLayout>
  );
};

const Header: React.FC<{ app: GetApplicationDetailsResponse }> = ({ app }) => (
  <Box p={3} display="flex" alignItems="center" gap={6}>
    <Box>
      <TinyLogo
        sx={{ height: 72, width: 72 }}
        area={72}
        label={app.title}
        src={app.logo}
      />
    </Box>
    <Box flexGrow={1}>
      <Typography variant="h5">{app.title}</Typography>
      <Typography variant="body1">{app.subtitle}</Typography>
      <Box display="flex" flexDirection="column">
        <Typography variant="caption">
          By: <Link>{app.creator}</Link>
        </Typography>
        <Typography variant="caption">
          Last Updated: {app.lastUpdated}
        </Typography>
      </Box>
    </Box>
    <Box
      display="flex"
      alignItems="flex-end"
      flexDirection="column"
      width="325px"
      gap={2}
    >
      <Button
        startIcon={<DashboardOutlined />}
        fullWidth
        variant="contained"
        href="/dashboard"
      >
        Dashboard
      </Button>
      <Button
        startIcon={<HelpOutline />}
        endIcon={<OpenInNew />}
        fullWidth
        variant="contained"
        href={app.tutorial}
      >
        Tutorial
      </Button>
    </Box>
  </Box>
);

const AdvertisementSection: React.FC = () => (
  <Box width="100%" display="flex" flexDirection="column" gap={1}>
    <Divider />
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={5}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <CheckCircle color="success" fontSize="small" />
        <Typography variant="body2">Easy to use</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <CheckCircle color="success" fontSize="small" />
        <Typography variant="body2">Pay as you go</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <CheckCircle color="success" fontSize="small" />
        <Typography variant="body2">No execution limits</Typography>
      </Box>
    </Box>
    <Divider />
  </Box>
);

const Footer: React.FC = () => (
  <Box width="100%">
    <Divider />
    <Box
      p={3}
      pb={5}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={2}
    >
      <ResourcesFooter />
    </Box>
  </Box>
);
