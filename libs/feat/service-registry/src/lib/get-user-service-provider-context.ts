import { getFreshContext } from '@worksheets/feat/app-connections';
import { findServiceConfiguration } from './util';

export const getUserServiceProviderContext = async ({
  userId,
  serviceId,
}: {
  userId: string;
  serviceId: string;
  // it's pretty hard to get the type of the context here since there are so many different possible providers.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<{ error: string } | { context: any; appId: string }> => {
  // check which service the user has enabled.
  const config = await findServiceConfiguration({
    userId,
    serviceId,
  });

  if (!config) {
    return { error: 'service-config-not-found' };
  }

  if (!config.enabled) {
    return { error: 'service-disabled' };
  }

  if (!config.providerId) {
    return { error: 'service-provider-not-found' };
  }
  // get the freshest context for that service.
  const context = await getFreshContext({
    userId,
    appId: config.providerId,
  });

  return { context, appId: config.providerId };
};
