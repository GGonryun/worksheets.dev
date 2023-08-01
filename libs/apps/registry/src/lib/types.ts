import { Method } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { registry } from './registry';

export type ApplicationRegistry = typeof registry;

export type ApplicationRegistryKeys = keyof ApplicationRegistry;

export type ApplicationMethods<T extends ApplicationRegistryKeys> =
  ApplicationRegistry[T]['methods'];

export type ApplicationMethodKeys<T> = T extends ApplicationRegistryKeys
  ? keyof ApplicationMethods<T>
  : never;

export type ApplicationContext<T> = T extends ApplicationRegistryKeys
  ? ApplicationRegistry[T]['context']
  : never;

export type ApplicationMethodData<
  T extends ApplicationRegistryKeys,
  K extends ApplicationMethodKeys<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = ApplicationMethods<T>[K] extends Method<any, any, infer I, infer O>
  ? {
      context: z.infer<ApplicationContext<T>>;
      input: z.infer<I>;
      output: z.infer<O>;
    }
  : never;

export type InferInput<
  T extends ApplicationRegistryKeys,
  K extends ApplicationMethodKeys<T>
> = ApplicationMethodData<T, K>['input'];

export type InferOutput<
  T extends ApplicationRegistryKeys,
  K extends ApplicationMethodKeys<T>
> = ApplicationMethodData<T, K>['output'];

export type InferApplicationContext<T extends ApplicationRegistryKeys> =
  z.infer<ApplicationContext<T>>;

export type InferContext<
  T extends ApplicationRegistryKeys,
  K extends ApplicationMethodKeys<T>
> = ApplicationMethodData<T, K>['context'];
