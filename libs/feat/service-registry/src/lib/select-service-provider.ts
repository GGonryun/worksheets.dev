import { newServiceConfigurationsDatabase } from '@worksheets/data-access/service-configurations';
import {
  SelectServiceProviderRequest,
  SelectServiceProviderResponse,
} from '@worksheets/schemas-services';
import { findServiceConfiguration } from './util';

const configs = newServiceConfigurationsDatabase();
export const selectServiceProvider = async (
  userId: string,
  { serviceId, providerId }: SelectServiceProviderRequest
): Promise<SelectServiceProviderResponse> => {
  const config = await findServiceConfiguration({ userId, serviceId });

  if (!providerId) {
    if (config) {
      configs.delete(config.id);
    }
    return { ok: true };
  }

  configs.updateOrInsert({
    id: config?.id ?? '',
    userId,
    serviceId,
    connectionId: '', // TODO: assign connections to services.
    enabled: true,
  });

  return { ok: true };
};
