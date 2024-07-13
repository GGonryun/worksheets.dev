import { IntegrationProvider } from '@worksheets/prisma';
import { pick } from 'lodash';

export const OAuthIntegrationProvider = pick(IntegrationProvider, [
  'TWITCH',
  'TWITTER',
  'DISCORD',
]);

export type OAuthIntegrationProvider =
  (typeof OAuthIntegrationProvider)[keyof typeof OAuthIntegrationProvider];
