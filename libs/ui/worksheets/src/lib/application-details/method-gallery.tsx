import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  Chip,
  Tooltip,
  Collapse,
  IconButton,
  ButtonBase,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { TinyLogo } from '../shared/tiny-logo';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import { addCommasToNumber } from '@worksheets/util/strings';
import Link from 'next/link';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { injectStyles } from '@stoplight/mosaic';
import React, { ReactNode, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CodeEditor } from '@worksheets/ui/code-editor';
import { useClipboard } from '@worksheets/ui/common';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { CopyAllOutlined } from '@mui/icons-material';
type MethodItem = ListApplicationMethodDetailsResponse[number];

export const MethodsGallery: React.FC<{
  methods: ListApplicationMethodDetailsResponse;
  app: GetApplicationDetailsResponse;
}> = ({ methods, app }) => {
  return (
    <Grid container spacing={2}>
      {methods?.map((method) => (
        <Grid xs={12} sm={12} md={6} lg={6} key={method.methodId}>
          <MethodCard app={app} method={method} />
        </Grid>
      ))}
    </Grid>
  );
};

const MethodCard: React.FC<{
  app: GetApplicationDetailsResponse;
  method: MethodItem;
}> = ({ method, app }) => {
  const setPricing = () => {
    if (method.pricing) {
      return `$${method.pricing}`;
    } else return `free`;
  };

  const setPricingLabel = () => {
    if (method.pricing) {
      return `$1 = ${addCommasToNumber(
        Math.round(1 / method.pricing)
      )} executions`;
    }
    return undefined;
  };

  return (
    <Card elevation={4}>
      <CardActionArea href={`#method-${method.methodId}`}>
        <CardHeader
          sx={{
            '& .MuiCardHeader-action': {
              alignSelf: 'center',
            },
          }}
          avatar={<TinyLogo label={app.title} src={app.logo} area={28} />}
          title={
            <Box
              display="flex"
              alignItems="center"
              justifyContent={'space-between'}
              pr={1}
            >
              <Typography>{method.label}</Typography>
              <Tooltip title={setPricingLabel()} placement="top">
                <Chip
                  size="small"
                  label={setPricing()}
                  color={method.pricing ? 'default' : 'success'}
                />
              </Tooltip>
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
    </Card>
  );
};

export const MethodDetailsList: React.FC<{
  methods: ListApplicationMethodDetailsResponse;
}> = ({ methods }) => {
  return (
    <Box>
      {methods.map((m) => (
        <MethodDetailsListItem key={m.methodId} method={m} />
      ))}
    </Box>
  );
};

const MethodDetailsListItem: React.FC<{
  method: MethodItem;
}> = ({ method }) => {
  injectStyles();

  return (
    <MosaicProvider>
      <Box
        id={`method-${method.methodId}`}
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        gap={1}
        pb={8}
      >
        <Link href={`#method-${method.methodId}`}>
          <Box display="flex" alignItems="baseline" gap={1}>
            <Typography variant="h5" fontWeight={900}>
              {method.label}
            </Typography>
          </Box>
        </Link>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box>
            <Typography variant="body2">{method.description}</Typography>
          </Box>
          <MethodSchemaExample method={method} />
          <MethodAPIExample method={method} />
          <MethodSDKExample method={method} />
        </Box>
      </Box>
    </MosaicProvider>
  );
};

const MethodAPIExample: React.FC<{
  method: MethodItem;
}> = ({ method }) => {
  const clipboard = useClipboard();
  const url = SERVER_SETTINGS.WEBSITES.API_URL(
    `/v1/call/${method.appId}/${method.methodId}`
  );
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" fontWeight={900}>
        Application Public Interface (API)
      </Typography>
      <Box display="Flex" alignItems="center" gap={1}>
        <Typography variant="body1" fontWeight={900}>
          URL:
        </Typography>
        <Typography variant="body1" sx={{ textDecoration: 'underline' }}>
          {url}
        </Typography>
        <Tooltip title="Copy URL to clipboard" placement="top">
          <span>
            <IconButton onClick={() => clipboard.copy(url)} size="small">
              <CopyAllOutlined fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <JsonExample
        label={'Request'}
        subtitle={'JSON'}
        request={method.examples.curl.request}
      />
      <JsonExample
        label={'Response'}
        subtitle={'JSON'}
        request={method.examples.curl.response}
      />
    </Box>
  );
};

const MethodSDKExample: React.FC<{
  method: MethodItem;
}> = ({ method }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="baseline" gap={1}>
        <Typography variant="h6" fontWeight={900}>
          Software Development Kit (SDK)
        </Typography>
      </Box>
      <CurlExample
        label={'cURL'}
        subtitle={'shell'}
        request={method.examples.curl.curl}
      />
      <SDKExample
        label={'Typescript'}
        subtitle="index.ts"
        sdk={method.examples.sdk}
      />
    </Box>
  );
};

const SDKExample: React.FC<{
  label: string;
  subtitle: string;
  sdk: string;
}> = ({ label, subtitle, sdk }) => {
  const clipboard = useClipboard();

  return (
    <CollapsibleItem label={label} subtitle={subtitle}>
      <Box
        mt={1.5}
        height="500px"
        minWidth="500px"
        border={(theme) => `2px solid ${theme.palette.divider}`}
      >
        <CodeEditor
          disabled
          onCopy={() => {
            clipboard.copy(sdk);
          }}
          height="100%"
          width="100%"
          value={sdk}
          mode={'typescript'}
          theme={'github'}
        />
      </Box>
    </CollapsibleItem>
  );
};

const MethodSchemaExample: React.FC<{
  method: MethodItem;
}> = ({ method }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="baseline" gap={1}>
        <Typography variant="h6" fontWeight={900}>
          Data Schema
        </Typography>
      </Box>
      <MethodDataSchema
        label={'Context'}
        subtitle="Configuration"
        schema={method.examples.schema.context}
      />
      <MethodDataSchema
        label={'Input'}
        subtitle="Request"
        schema={method.examples.schema.input}
      />
      <MethodDataSchema
        label={'Output'}
        subtitle="Response"
        schema={method.examples.schema.output}
      />
    </Box>
  );
};

const MethodDataSchema: React.FC<{
  label: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
}> = ({ schema, label, subtitle }) => {
  return (
    <CollapsibleItem label={label} subtitle={subtitle}>
      <Box pl={3.9}>
        <JsonSchemaViewer
          defaultExpandedDepth={0}
          disableCrumbs={true}
          renderRootTreeLines={true}
          schema={schema}
        />
        <Divider sx={{ ml: 0.1 }} />
      </Box>
    </CollapsibleItem>
  );
};

const CurlExample: React.FC<{
  label: string;
  subtitle: string;
  request: string;
}> = ({ label, subtitle, request }) => {
  const clipboard = useClipboard();

  return (
    <CollapsibleItem label={label} subtitle={subtitle}>
      <Box
        mt={1.5}
        height="200px"
        border={(theme) => `2px solid ${theme.palette.divider}`}
      >
        <CodeEditor
          disabled
          onCopy={() => {
            clipboard.copy(request);
          }}
          height="100%"
          width="100%"
          value={request}
          mode={'sh'}
          theme={'cloud9_day'}
        />
      </Box>
    </CollapsibleItem>
  );
};

const JsonExample: React.FC<{
  label: string;
  subtitle: string;
  request: string;
}> = ({ label, subtitle, request }) => {
  const clipboard = useClipboard();

  return (
    <CollapsibleItem label={label} subtitle={subtitle} startOpen>
      <Box
        mt={1.5}
        height="200px"
        border={(theme) => `2px solid ${theme.palette.divider}`}
      >
        <CodeEditor
          disabled
          onCopy={() => {
            clipboard.copy(request);
          }}
          height="100%"
          width="100%"
          value={request || '// no data'}
          mode={'json'}
          theme={'cloud9_day'}
        />
      </Box>
    </CollapsibleItem>
  );
};

const CollapsibleItem: React.FC<{
  label: string;
  subtitle: string;
  children: ReactNode;
  startOpen?: boolean;
}> = ({ subtitle, label, children, startOpen }) => {
  const [open, setOpen] = useState(startOpen ?? false);
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          sx={{ p: 0, m: 0 }}
          onClick={() => setOpen((o) => !o)}
          color="primary"
        >
          {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Box display="flex" alignItems="baseline" gap={1}>
          <ButtonBase onClick={() => setOpen((o) => !o)}>
            <Typography variant="body1" sx={{ textDecoration: 'underline' }}>
              {label}
            </Typography>
          </ButtonBase>
          <Typography variant="caption" color="text.secondary">
            ({subtitle})
          </Typography>
        </Box>
      </Box>
      <Collapse in={open}>{children}</Collapse>
    </Box>
  );
};
