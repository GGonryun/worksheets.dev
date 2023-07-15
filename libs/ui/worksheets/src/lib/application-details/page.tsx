import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Collapse,
  Divider,
  Typography,
} from '@mui/material';
import { FloatingLayout } from '../floating-layout';
import { trpc } from '@worksheets/trpc/ide';
import { TinyLogo } from '../shared/tiny-logo';
import { CheckCircle, OpenInNew } from '@mui/icons-material';
import { GetApplicationResponse, ListMethodsResponse } from '../shared/types';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { CodeEditor } from '@worksheets/ui/code-editor';
import { ResourcesFooter } from '../shared/resources-footer';
import { OpenInNewTabLink } from '@worksheets/ui/common';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

type SingleMethodResponse = ListMethodsResponse[number];

export const ApplicationDetailsPage: React.FC<{ appId: string }> = ({
  appId,
}) => {
  const { data: app } = trpc.applications.get.useQuery(
    { appId },
    { enabled: !!appId }
  );

  if (!app) return <Box />;

  return (
    <FloatingLayout secure={false}>
      <Header app={app} />
      <AdvertisementSection />
      <MethodsGallery app={app} />
      <Footer />
    </FloatingLayout>
  );
};

const Header: React.FC<{ app: GetApplicationResponse }> = ({ app }) => (
  <Box p={3} display="flex" alignItems="center" gap={6}>
    <Box>
      <TinyLogo area={100} label={app.name} src={app.logo} />
    </Box>
    <Box flexGrow={1}>
      <Typography variant="h5">
        {app.name} ({app.id})
      </Typography>
      <Typography variant="body1">{app.description}</Typography>
      <Box display="flex" flexDirection="column">
        <Typography variant="caption">
          By:{' '}
          <OpenInNewTabLink fontSize={14} href={''}>
            Worksheets
          </OpenInNewTabLink>
        </Typography>
        <Typography variant="caption">Last Updated: June 28th, 2023</Typography>
      </Box>
    </Box>
    <Box
      display="flex"
      alignItems="flex-end"
      flexDirection="column"
      width="325px"
      gap={2}
    >
      <Button fullWidth variant="contained" href="/dashboard">
        Visit Dashboard
      </Button>
      <Button
        startIcon={<OpenInNew />}
        fullWidth
        variant="contained"
        href={SERVER_SETTINGS.WEBSITES.DOCS_URL()}
      >
        Quick Start Guide
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
        <Typography variant="body2">Free forever</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <CheckCircle color="success" fontSize="small" />
        <Typography variant="body2">Pay-as-you-go pricing</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <CheckCircle color="success" fontSize="small" />
        <Typography variant="body2">No execution limits</Typography>
      </Box>
    </Box>
    <Divider />
  </Box>
);

const MethodsGallery: React.FC<{ app: GetApplicationResponse }> = ({ app }) => {
  return (
    <Box
      p={3}
      pt={1}
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Typography variant="h6" sx={{ textDecoration: 'underline' }}>
          Code Samples
        </Typography>
      </Box>
      <MethodGrid app={app} />
    </Box>
  );
};

const MethodCard: React.FC<{
  app: GetApplicationResponse;
  method: SingleMethodResponse;
}> = ({ app, method }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card elevation={4}>
      <CardActionArea onClick={() => setOpen(!open)}>
        <CardHeader
          sx={{
            '& .MuiCardHeader-action': {
              alignSelf: 'center',
            },
          }}
          avatar={<TinyLogo label={app.name} src={app.logo} area={28} />}
          title={
            <Box display="flex" alignItems="baseline" gap={4}>
              <Typography>{method.label}</Typography>
              <Typography variant="caption" color="text.secondary">
                ({app.id}.{method.id})
              </Typography>
            </Box>
          }
          subheader={method.description}
          action={
            <Box display="flex" alignItems="center" justifyContent="center">
              <ExpandMoreIcon />
            </Box>
          }
        />
      </CardActionArea>
      <Divider />
      <Collapse in={open}>
        <Box height="300px">
          <CodeEditor
            value={method.example ?? ''}
            mode="typescript"
            theme="light"
            height="100%"
            width="100%"
            disabled
          />
        </Box>
      </Collapse>
    </Card>
  );
};

const MethodGrid: React.FC<{
  app: GetApplicationResponse;
}> = ({ app }) => {
  const { data: methods } = trpc.applications.methods.list.useQuery({
    appId: app.id,
  });

  return (
    <Grid container spacing={2}>
      {methods?.map((method) => (
        <Grid xs={12} sm={12} md={6} lg={6} key={method.id}>
          <MethodCard app={app} method={method} />
        </Grid>
      ))}
    </Grid>
  );
};

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
