import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import {
  GetServiceDetailsResponse,
  ServiceEndpointInfo,
  ServiceProvider,
} from '@worksheets/schemas-services';
import { services } from '@worksheets/services-registry';
import { ServiceEndpoints } from '@worksheets/services-core';
import { TRPCError } from '@trpc/server';
import { ConnectionStatuses } from '@worksheets/schemas-connections';
import { findServiceConfiguration } from './util';
const apps = newApplicationsDatabase();

type GetServiceDetailsRequest = {
  userId: string;
  serviceId: string;
};

export const getServiceDetails = async (
  opts: GetServiceDetailsRequest
): Promise<GetServiceDetailsResponse> => {
  const key = opts.serviceId as keyof typeof services;
  const service = services[key];

  const configuration = await findServiceConfiguration(opts);
  const providers = await getServiceProviders(service.providers, opts.userId);
  const endpoints = getServiceEndpoints(service.endpoints);

  return {
    service: { ...service, providers, endpoints: endpoints.map((e) => e.id) },
    configuration,
    providers,
    endpoints,
  };
};

const getServiceEndpoints = (
  endpoints: ServiceEndpoints
): ServiceEndpointInfo[] => {
  const endpointDetails: ServiceEndpointInfo[] = [];

  for (const key in endpoints) {
    const value = endpoints[key];

    endpointDetails.push({
      id: value.id,
      title: value.title,
      subtitle: value.subtitle,
      logo: value.logo,
    });
  }

  return endpointDetails;
};

type GetAppProviderOptions = {
  appId: string;
  userId: string;
};

const getServiceProviders = async (
  providers: string[],
  userId: string
): Promise<ServiceProvider[]> => {
  const serviceProviders: ServiceProvider[] = [];
  for (const appId of providers) {
    const provider = await getAppProvider({ appId, userId });
    serviceProviders.push(provider);
  }

  return serviceProviders;
};

const getAppProvider = async ({
  appId,
  userId,
}: GetAppProviderOptions): Promise<ServiceProvider> => {
  // find the app in the registry
  const app = apps.get(appId);
  let status: ConnectionStatuses = 'pending';
  try {
    // const connection = await getPresentiationalConnection({ appId, userId });
    // status = connection.status;
  } catch (error) {
    if (error instanceof TRPCError && error.code === 'METHOD_NOT_SUPPORTED') {
      status = 'active';
    } else {
      console.error(
        'failed to get presentational connection',
        appId,
        userId,
        error
      );
    }
  }

  return {
    id: app.id,
    name: app.name,
    description: app.description,
    logo: app.logo,
    status,
  };
};
