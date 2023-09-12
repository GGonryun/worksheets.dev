import {
  ConnectedServiceDescription,
  CategorizeServicesResponse,
  ServiceConfigurationEntity,
  ServiceStatus,
} from '@worksheets/schemas-services';
import { services } from '@worksheets/services-registry';
import { findServiceConfiguration } from './util';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';

const apps = newApplicationsDatabase();
export const categorizeServices = async (opts: {
  userId: string;
}): Promise<CategorizeServicesResponse> => {
  const serviceDetails: CategorizeServicesResponse = {
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
        // TODO: refactor configs, we may need to save the app id in the config to save a lookup here.
        appId: undefined,
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
  if (!config || !config.connectionId) {
    return 'uninstalled';
  }

  if (!config.enabled) {
    return 'disabled';
  }

  // TODO: add stability check.
  // return "unstable";

  return 'connected';
};
