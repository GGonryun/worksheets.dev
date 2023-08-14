import { Box, Typography, alpha } from '@mui/material';
import WebsiteLayout from '../website-layout';
import { trpc } from '@worksheets/trpc/ide';
import { useUser } from '@worksheets/util/auth/client';
import { ServicesHeader } from './header';
import { ServiceCard } from './card';
import {
  ConnectedServiceDescription,
  ServiceCategory,
} from '@worksheets/schemas-services';
import { serviceCategoryLabel } from './state-maps';

export const ServicesPage: React.FC = () => {
  const { user } = useUser();
  const { data: categorizedServices } = trpc.services.list.useQuery(undefined, {
    enabled: !!user,
  });

  return (
    <WebsiteLayout>
      <Box
        height="100%"
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.primary.light, 0.1),
        })}
      >
        <Box p={3}>
          <ServicesHeader />
        </Box>
        <Box display="flex" flexWrap="wrap">
          {categorizedServices &&
            Object.keys(categorizedServices).map((category) => (
              <ServiceGroup
                title={serviceCategoryLabel[category as ServiceCategory]}
                key={category}
                services={
                  categorizedServices[category as ServiceCategory] ?? []
                }
              />
            ))}
        </Box>
      </Box>
    </WebsiteLayout>
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
