import {
  ConnectedServiceDescription,
  ListServicesResponse,
  ServiceConfigurationEntity,
  ServiceStatus,
} from '@worksheets/schemas-services';
import { services } from '@worksheets/services-registry';
import { findServiceConfiguration } from './util';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';

const apps = newApplicationsDatabase();
export const listServices = async (opts: {
  userId: string;
}): Promise<ListServicesResponse> => {
  const serviceDetails: ListServicesResponse = {
    communication: [],
    data: [],
    media: [],
    social: [],
    storage: [],
    finance: [],
    location: [],
    internal: [],
    prediction: [],
  };

  for (const key in services) {
    const serviceId = key as keyof typeof services;
    const value = services[serviceId];

    const config = await findServiceConfiguration({
      userId: opts.userId,
      serviceId,
    });

    const service: ConnectedServiceDescription = {
      connection: {
        status: determineServiceStatus(config),
        appId: config?.providerId,
      },
      id: value.id,
      title: value.title,
      subtitle: value.subtitle,
      logo: value.logo,
      category: value.category,
      providers: value.providers.map(apps.get),
      endpoints: Object.keys(value.endpoints),
    };

    serviceDetails[value.category]?.push(service);
  }

  return serviceDetails;
};

const determineServiceStatus = (
  config: ServiceConfigurationEntity | undefined
): ServiceStatus => {
  if (!config || !config.providerId) {
    return 'uninstalled';
  }

  if (!config.enabled) {
    return 'disabled';
  }

  // TODO: add stability check.
  // return "unstable";

  return 'connected';
};
