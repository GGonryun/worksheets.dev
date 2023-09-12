import {
  ServiceDescription,
  ListServicesResponse,
} from '@worksheets/schemas-services';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { services } from '@worksheets/services-registry';

const apps = newApplicationsDatabase();
export const listServices = async (): Promise<ListServicesResponse> => {
  const descriptions: ServiceDescription[] = [];
  for (const key in services) {
    const serviceId = key as keyof typeof services;
    const value = services[serviceId];

    const service: ServiceDescription = {
      id: value.id,
      title: value.title,
      subtitle: value.subtitle,
      logo: value.logo,
      category: value.category,
      providers: value.providers.map(apps.get),
      endpoints: Object.keys(value.endpoints),
    };

    descriptions.push(service);
  }

  return descriptions;
};
