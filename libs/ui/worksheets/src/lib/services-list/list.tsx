import { Box, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc/ide';
import { ServiceCard } from './card';
import {
  ConnectedServiceDescription,
  ServiceCategory,
} from '@worksheets/schemas-services';
import { serviceCategoryLabel } from './state-maps';
import { FeatureLayout, useUser } from '@worksheets/ui/common';

export const ServicesList: React.FC = () => {
  const { user } = useUser();
  const { data: categorizedServices } = trpc.services.categorize.useQuery(
    undefined,
    {
      enabled: !!user,
    }
  );

  return (
    <FeatureLayout
      HeaderProps={{
        title: 'Explore Services',
        subtitle:
          'Worksheets provides a consistent interface for all Business services. Here you can find what you need to get started with a service: providers, demos, use cases, and more!',
        src: '/icons/features/connections.svg',
      }}
    >
      <Box display="flex" flexWrap="wrap">
        {categorizedServices &&
          Object.keys(categorizedServices).map((category) => (
            <ServiceGroup
              title={serviceCategoryLabel[category as ServiceCategory]}
              key={category}
              services={categorizedServices[category as ServiceCategory] ?? []}
            />
          ))}
      </Box>
    </FeatureLayout>
  );
};

const ServiceGroup: React.FC<{
  title: string;
  services: ConnectedServiceDescription[];
}> = ({ title, services }) => {
  if (services.length === 0) return null;

  return (
    <Box px={3} py={1} display="flex" flexDirection="column" gap={1}>
      <Typography variant="h6" fontWeight={900}>
        {title}
      </Typography>
      <Box display="flex" gap={2} flexWrap={'wrap'}>
        {services?.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </Box>
    </Box>
  );
};
