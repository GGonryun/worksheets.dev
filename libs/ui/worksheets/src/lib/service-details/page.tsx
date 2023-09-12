import {
  Box,
  Link,
  Typography,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { trpc } from '@worksheets/trpc/ide';
import { GetServiceDetailsResponse } from '@worksheets/schemas-services';
import { PlatformSelectionTab } from './platforms';
import { EndpointsTable } from './endpoints';
import { ArrowBackIos } from '@mui/icons-material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { useUser } from '@worksheets/ui/common';
import { tabA11yProps } from '@worksheets/ui/common';

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
      content={<ServiceContent {...details} />}
    />
  );
};

export const ServiceLayout: React.FC<{
  header: ReactNode;
  content: ReactNode;
}> = ({ header, content }) => (
  <Box>
    <Box
      px={2}
      pt={2}
      pb={1}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Typography variant="body2" color="text.secondary">
        <Link
          underline="hover"
          color="inherit"
          href="/services"
          display="flex"
          alignItems="center"
          gap={0.5}
        >
          <ArrowBackIos fontSize="inherit" color="inherit" />
          Services
        </Link>
      </Typography>
    </Box>
    <Box
      px={3}
      pb={2}
      // sx={(theme) => ({
      //   backgroundColor: theme.palette.background.paper,
      // })}
    >
      {header}
    </Box>
    {content}
  </Box>
);

const ServiceContent: React.FC<GetServiceDetailsResponse> = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Divider />

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        // sx={(theme) => ({
        //   backgroundColor: theme.palette.background.paper,
        // })}
      >
        <Tab label="Platforms" {...tabA11yProps(0)} />
        <Tab label="Endpoints" {...tabA11yProps(1)} />
      </Tabs>
      <Divider />

      <Box p={3}>
        {value === 0 && <PlatformSelectionTab {...props} />}
        {value === 1 && <EndpointsTable {...props} />}
      </Box>
    </>
  );
};

const ServiceDetailsHeader: React.FC<GetServiceDetailsResponse> = ({
  service,
}) => {
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
        </Box>
      </Box>
    </Box>
  );
};
