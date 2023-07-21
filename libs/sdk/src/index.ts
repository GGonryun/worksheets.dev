import { newClient } from '@worksheets/apps-fetcher';
export type {
  ApplicationRegistry,
  ApplicationRegistryKeys,
  ApplicationMethods,
  ApplicationMethodKeys,
  ApplicationMethodData,
  InferContext,
  InferInput,
  InferOutput,
} from '@worksheets/apps-registry';
export type { Applications } from '@worksheets/apps-core';
export { ApplicationFailure } from '@worksheets/apps-core';

export const newRegistry = newClient;
