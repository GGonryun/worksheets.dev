import { ApplicationContext, Method } from '@worksheets/apps-core';
import {
  ApplicationRegistry,
  ApplicationRegistryKeys,
} from '@worksheets/apps-registry';
import { z } from '@worksheets/zod';

export type ExecutorActions = {
  [AppId in keyof ApplicationRegistry]: ApplicationExecutors<AppId>;
};

export type ApplicationExecutors<App extends ApplicationRegistryKeys> = {
  [Method in keyof ApplicationRegistry[App]['methods']]: ApplicationMethodExecutor<
    App,
    Method
  >;
};

export type ApplicationMethodExecutor<
  T extends ApplicationRegistryKeys,
  K extends keyof ApplicationRegistry[T]['methods']
> = ApplicationRegistry[T]['methods'][K] extends Method<
  string,
  string,
  infer Input,
  infer Output
>
  ? (opts: {
      ctx: ApplicationContext<ApplicationRegistry[T]>;
      input: z.infer<Input>;
    }) => Promise<z.infer<Output>>
  : never;
