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

  if (!config.connectionId) {
    return { error: 'service-connection-required' };
  }
  // TODO: use the connectionId from the config.
  const { context, connection } = await getFreshContext({
    userId,
    connectionId: config.connectionId,
  });

  if (!connection) {
    return { error: 'service-connection-not-found' };
  }

  return { context, appId: connection?.appId };
};
