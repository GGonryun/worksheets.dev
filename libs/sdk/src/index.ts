import { newClient as newAppsClient } from '@worksheets/apps-fetcher';
export type {
  Applications,
  ApplicationKeys,
  ApplicationMethodKeys,
  ApplicationMethodData,
} from '@worksheets/apps-registry';

export const newRegistry = newAppsClient;
