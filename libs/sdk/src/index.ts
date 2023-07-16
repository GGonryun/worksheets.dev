import { newClient } from '@worksheets/apps-fetcher';
export type {
  Applications,
  ApplicationKeys,
  ApplicationMethodKeys,
  ApplicationMethodData,
} from '@worksheets/apps-registry';

export { ApplicationFailure } from '@worksheets/apps-registry';

export const newRegistry = newClient;
