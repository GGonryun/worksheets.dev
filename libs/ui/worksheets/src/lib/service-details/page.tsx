import {
  Box,
  Link,
  Typography,
  Breadcrumbs,
  Chip,
  Paper,
  Tabs,
  Tab,
  Switch,
  Divider,
  CircularProgress,
  Tooltip,
  alpha,
} from '@mui/material';
import WebsiteLayout from '../website-layout';
import React, { ReactNode, useState } from 'react';
import { TinyLogo } from '../shared/tiny-logo';
import { trpc } from '@worksheets/trpc/ide';
import { useUser } from '@worksheets/util/auth/client';
import { GetServiceDetailsResponse } from '@worksheets/schemas-services';
import { serviceCategoryLabel } from '../services-list/state-maps';
import { PlatformSelectionTab } from './platforms';
import { EndpointsTable } from './endpoints';
import { a11yProps } from '../shared/tab-panel';

export const ServiceDetailsPage: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { user } = useUser();
  const { data: details, isLoading } = trpc.services.details.useQuery(
    { serviceId },
    { enabled: !!serviceId && !!user }
  );

  if (isLoading || !details)
    return (
      <Box>
        <CircularProgress />
      </Box>
    );

  return (
    <ServiceLayout
      header={<ServiceDetailsHeader {...details} />}
      breadcrumbs={<ServicePathBreadcrumbs {...details} />}
      content={<ServiceContent {...details} />}
      chip={<ServiceCategoryChip {...details} />}
    />
  );
};

export const ServiceLayout: React.FC<{
  breadcrumbs: ReactNode;
  header: ReactNode;
  content: ReactNode;
  chip: ReactNode;
}> = ({ breadcrumbs, header, content, chip }) => (
  <WebsiteLayout>
    <Box
      height="100%"
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.primary.light, 0.05),
      })}
    >
      <Box
        p={3}
        py={1}
        sx={(theme) => ({ backgroundColor: theme.palette.background.paper })}
      >
        <Box
          pt={1}
          pb={2}
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          {breadcrumbs}
          {chip}
        </Box>
        {header}
      </Box>
      {content}
    </Box>
  </WebsiteLayout>
);

const ServiceCategoryChip: React.FC<GetServiceDetailsResponse> = ({
  service,
}) => (
  <Link href={`/services?category=${service.category}`} sx={{ pb: 0.2 }}>
    <Chip
      sx={{ cursor: 'pointer' }}
      label={serviceCategoryLabel[service.category]}
      size="small"
      color="primary"
    />
  </Link>
);

const ServiceContent: React.FC<GetServiceDetailsResponse> = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Divider />

      <Paper elevation={0} square>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Platforms" {...a11yProps(0)} />
          <Tab label="Endpoints" {...a11yProps(1)} />
        </Tabs>
      </Paper>

      <Box p={3}>
        {value === 0 && <PlatformSelectionTab {...props} />}
        {value === 1 && <EndpointsTable {...props} />}
      </Box>
    </>
  );
};

const ServiceDetailsHeader: React.FC<GetServiceDetailsResponse> = ({
  service,
  configuration,
}) => {
  const utils = trpc.useContext();
  const updateStatus = trpc.services.toggleStatus.useMutation();

  const handleSwitchClick = async () => {
    await updateStatus.mutateAsync({
      serviceId: service.id,
    });
    utils.services.details.invalidate({ serviceId: service.id });
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={3}>
        <TinyLogo
          src={service.logo}
          label={service.title}
          borderless
          area={48}
        />
        <Box>
          <Typography variant="h5" fontWeight={900}>
            {service.title}
          </Typography>
          <Typography>{service.subtitle}</Typography>
          <Tooltip
            title={
              'You must select a provider before configuring this service.'
            }
            disableHoverListener={!!configuration}
          >
            <Box display="flex" gap={1} alignItems="center">
              <Typography
                variant="body2"
                fontWeight={900}
                color="text.secondary"
              >
                Enabled?
              </Typography>
              <span>
                <Switch
                  onClick={() => handleSwitchClick()}
                  size="small"
                  checked={configuration?.enabled ?? false}
                  disabled={!configuration}
                />
              </span>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

const ServicePathBreadcrumbs: React.FC<GetServiceDetailsResponse> = ({
  service,
}) => (
  <Breadcrumbs aria-label="breadcrumb">
    <Link underline="hover" color="inherit" href="/services">
      Services
    </Link>
    <Link
      underline="hover"
      color="text.primary"
      href={`/services/${service.id}`}
    >
      {service.title}
    </Link>
  </Breadcrumbs>
);
