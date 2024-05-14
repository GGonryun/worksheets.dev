import { IntegrationProvider } from '@worksheets/prisma';
import { pick } from 'lodash';

export const APIKeyIntegrationProvider = pick(IntegrationProvider, ['STEAM']);

export type APIKeyIntegrationProvider =
  (typeof APIKeyIntegrationProvider)[keyof typeof APIKeyIntegrationProvider];

export const parseAPIKeyIntegrationProvider = (
  providerId: string | string[] | undefined
): [APIKeyIntegrationProvider, true] | [unknown, false] => {
  if (!providerId || Array.isArray(providerId)) return [providerId, false];
  const pid = providerId.toUpperCase() as APIKeyIntegrationProvider;
  if (Object.values(APIKeyIntegrationProvider).includes(pid))
    return [pid, true];
  return [pid, false];
};
