/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyApplication,
  Application,
  ApplicationContext,
} from '@worksheets/apps-core';
import { ApplicationRegistry } from '@worksheets/apps-registry';
import { z } from '@worksheets/zod';

export type ApplicationMethodRequests<T> = T extends Application<
  string,
  z.ZodTypeAny,
  string,
  infer Methods
>
  ? {
      [K in keyof Methods]: (
        input: z.infer<Methods[K]['input']>
      ) => Promise<z.infer<Methods[K]['output']>>;
    }
  : never;

export type ApplicationRegistryRequests = {
  [AppId in keyof ApplicationRegistry]: ApplicationRegistryRequestsHelper<
    ApplicationRegistry[AppId]
  >;
};

// this function makes it easier to return a function that takes a context versus a function that doesn't
export type ApplicationRegistryRequestsHelper<App extends AnyApplication> =
  ApplicationContext<App> extends null | never | undefined
    ? () => ApplicationMethodRequests<App>
    : (ctx: ApplicationContext<App>) => ApplicationMethodRequests<App>;
