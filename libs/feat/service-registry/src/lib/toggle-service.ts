import { newServiceConfigurationsDatabase } from '@worksheets/data-access/service-configurations';
import {
  ToggleServiceRequest,
  ToggleServiceResponse,
} from '@worksheets/schemas-services';
import { findServiceConfiguration } from './util';
import { TRPCError } from '@trpc/server';

const configs = newServiceConfigurationsDatabase();
export const toggleService = async (
  userId: string,
  { serviceId }: ToggleServiceRequest
): Promise<ToggleServiceResponse> => {
  const config = await findServiceConfiguration({ userId, serviceId });

  if (!config) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Service configuration not found',
    });
  }

  configs.update({
    ...config,
    enabled: !config.enabled,
  });

  return { ok: true };
};
