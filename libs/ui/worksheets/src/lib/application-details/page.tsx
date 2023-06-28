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
import { OpenInNewTabLink } from '../shared/open-in-new-tab-link';
import { CheckCircle } from '@mui/icons-material';
import { GetApplicationResponse, ListMethodsResponse } from '../shared/types';
import { useRouter } from 'next/router';
import { TemplatesGrid } from '../templates-gallery/templates-grid';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { CodeEditor } from '@worksheets/ui/code-editor';
import { ResourcesFooter } from '../shared/resources-footer';

type SingleMethodResponse = ListMethodsResponse[number];

export const ApplicationDetailsPage: React.FC<{ appId: string }> = ({
  appId,
}) => {
  const { data: app } = trpc.applications.get.useQuery({ appId });

  if (!app) return <Box />;

  return (
    <FloatingLayout>
      <Header app={app} />
      <AdvertisementSection />
      <TemplatesGallery app={app} />
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
      <Typography variant="h5">{app.name}</Typography>
      <Typography variant="body1">{app.description}</Typography>
      <Box display="flex" flexDirection="column">
        <Typography variant="caption">
          By:{' '}
          <OpenInNewTabLink fontSize={14} href={'/organizations/worksheets'}>
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
      <Button fullWidth variant="contained" href="/worksheets/create">
        Try It Free
      </Button>
      <Button fullWidth variant="contained" href="/templates">
        Templates
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

const TemplatesGallery: React.FC<{ app: GetApplicationResponse }> = ({
  app,
}) => {
  const { push } = useRouter();
  return (
    <Box p={3} display="flex" flexDirection="column" gap={2} width="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Typography variant="h6">
          Automate workflows with our easy-to-use templates
        </Typography>
      </Box>

      <TemplatesGrid
        appIds={[app.id]}
        onAppClick={(app) => push(`/applications/${app.id}`)}
      />
    </Box>
  );
};

const MethodsGallery: React.FC<{ app: GetApplicationResponse }> = ({ app }) => {
  return (
    <Box p={3} display="flex" flexDirection="column" gap={2} width="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Typography variant="h6">Supported Methods</Typography>
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
          title={method.label}
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
            hideLineNumbers
            value={method.example ?? ''}
            mode={'yaml'}
            theme={'light'}
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
        <Grid xs={6} key={method.id}>
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
