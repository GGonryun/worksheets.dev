/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from '@worksheets/apps-core';
import { ApplicationRegistry } from '@worksheets/apps-registry';
import { z } from '@worksheets/zod';

export type ApplicationRegistrySampleData = {
  [AppId in keyof ApplicationRegistry]: MethodSampleData<
    ApplicationRegistry[AppId]
  >;
};

export type MethodSampleData<T> = T extends Application<
  string,
  any,
  any,
  infer Methods
>
  ? {
      [K in keyof Methods]: {
        input: z.infer<Methods[K]['input']>;
        output: z.infer<Methods[K]['output']>;
      };
    } & { context?: z.infer<T['context']> }
  : never;
